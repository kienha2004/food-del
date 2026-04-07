import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import driverModel from "../models/driverModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {

    const userId = req.userId || req.body.userId;
    const { items, amount, address } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0 || !amount) {
      return res.status(400).json({ success: false, message: "Tải trọng không hợp lệ" });
    }


    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();


    await userModel.findByIdAndUpdate(userId, { cartData: {} });


    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(Number(item.price) * 100), // paise
      },
      quantity: item.quantity || 1,
    }));


    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: Math.round(20 * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("placeOrder error:", error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};

const verifyOrder = async (req, res) => {

  const { orderId } = req.body || {};
  const success = (req.body && req.body.success) || (req.query && req.query.success);

  try {
    if (success === "true" || success === true) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Đã trả" });
    } else {

      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      return res.json({ success: false, message: "Không thể trả" });
    }
  } catch (error) {
    console.error("verifyOrder error:", error);
    return res.status(500).json({ success: false, message: "error" });
  }
};

const userOrders = async (req, res) => {
  try {

    const userId =
      req.userId ||
      (req.user && (req.user.id || req.user.userId)) ||
      (req.body && req.body.userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Không được phép: thiếu id người dùng" });
    }

    const orders = await orderModel.find({ userId });
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error("userOrders error:", error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" })

  }
}
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findById(orderId);
    
    await orderModel.findByIdAndUpdate(orderId, { status });

    // If order is delivered, set driver status back to Available
    if (status === "Delivered" && order.driverId) {
      await driverModel.findByIdAndUpdate(order.driverId, { status: "Available" });
    }

    res.json({ success: true, message: "Đã cập nhật trạng thái" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const assignDriver = async (req, res) => {
  try {
    const { orderId, driverId, driverName } = req.body;
    
    // Find the current order to see if it already has a driver
    const currentOrder = await orderModel.findById(orderId);
    if (currentOrder.driverId && currentOrder.driverId !== driverId) {
      // Release the previous driver
      await driverModel.findByIdAndUpdate(currentOrder.driverId, { status: "Available" });
    }

    await orderModel.findByIdAndUpdate(orderId, { driverId, driverName });
    
    // Mark the new driver as Busy
    if (driverId) {
      await driverModel.findByIdAndUpdate(driverId, { status: "Busy" });
    }
    
    res.json({ success: true, message: "Đã phân công tài xế" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi phân công tài xế" });
  }
};

const removeOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: true, message: "Đã xóa đơn hàng/giao dịch" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi khi xóa" });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, payment, amount } = req.body;
    const updateData = {};
    if (payment !== undefined) updateData.payment = payment;
    if (amount !== undefined) updateData.amount = amount;
    
    await orderModel.findByIdAndUpdate(orderId, updateData);
    res.json({ success: true, message: "Đã cập nhật thông tin kế toán" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Lỗi cập nhật" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, removeOrder, updatePaymentStatus, assignDriver };