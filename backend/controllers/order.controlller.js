import Stripe from "stripe";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const id = req.user;
    const { items, amount, address } = req.body;

    const order = new Order({
      userId: id,
      items,
      amount,
      address,
    });

    await order.save();

    await User.findByIdAndUpdate(id, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "aud",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 10 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Error in the placeOrder controller: ", error);
    res.status(500).json({ success: false, message: error });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Payment Successfull" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in the verifyOrder controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userOrder = async (req, res) => {
  try {
    const id = req.user;

    const orders = await Order.find({ userId: id });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in the userOrder controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// orders for the admin panel

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No orders found" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in the listOrders controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//api for updating order status

export const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await Order.findByIdAndUpdate(id, { status: status });

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Error in the updateStatus controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
