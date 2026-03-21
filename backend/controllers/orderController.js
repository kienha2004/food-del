import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // basic validation
    const { userId, items, amount, address } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0 || !amount) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    // create order record (optional: you may prefer to create after payment confirmation)
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // clear user's cartData (use update, not delete)
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // prepare line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        // amount in paise (integer). Remove any unintended multiplier.
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity || 1,
    }));

    // add shipping fee (example: ₹20 -> 2000 paise)
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
const verifyOrder = async(req,res)=>{
const {orderId,success}= req.body;
try{
  if(success=="true"){
    await orderModel.findByIdAndUpdate(orderId,{payment:true});
    res.json({success:true,message:" Đã trả"})
  }
  else {
    await orderModel.findByIdAndUpdate(orderId);
    res.json({success:false,message:"không thể trả"})
  }
}  catch(error){
  console.log(error);
  res.json({success:false,message:"error"})
}
}
const userOrders =async (req,res)=>{
try {
  const orders = await orderModel.find({userId:req.body.userId});
  res.json({sucess:true,data:orders})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"error"})
}
}

export { placeOrder,verifyOrder,userOrders };