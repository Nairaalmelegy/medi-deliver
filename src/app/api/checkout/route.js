import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);

  const {cartProducts, address} = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {

    // Fetch product information
    const productInfo = await Product.findById(cartProduct._id);

    // Set product price to the base price (no size or extras)
    const productPrice = productInfo.basePrice;

    // Set product name
    const productName = cartProduct.name;

    // Prepare Stripe line items
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100, // Stripe expects prices in cents
      },
    });
  }

  // Create Stripe session for checkout
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: {orderId: orderDoc._id.toString()},
    payment_intent_data: {
      metadata: {orderId: orderDoc._id.toString()},
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {amount: 500, currency: 'USD'},
        },
      }
    ],
  });

  return Response.json(stripeSession.url);
}
