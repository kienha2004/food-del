import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {

    const userId = req.userId || req.body.userId;
    const { items, amount, address } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0 || !amount) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
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
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(Number(item.price) * 100), // paise
      },
      quantity: item.quantity || 1,
    }));


    line_items.push({
      price_data: {
        currency: "inr",
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
    return res.status(500).json({ success: false, message: "Internal server error" });
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
      return res.status(401).json({ success: false, message: "Unauthorized: missing user id" });
    }

    const orders = await orderModel.find({ userId });
    return res.json({ success: true, data: orders });
  } catch (error) {
    console.error("userOrders error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
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
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Đã cập nhật trạng thái" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" })
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };