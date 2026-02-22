import "dotenv/config";
import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import Order from "../dist/models/Order.js";

const nanoid = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

function generateOrderNumber(date) {
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `ORD-${formattedDate}-${nanoid()}`;
}

async function migrateOrders() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(mongoUri);

  try {
    const orders = await Order.find({
      $or: [{ orderNumber: { $exists: false } }, { orderNumber: null }],
    });

    for (const order of orders) {
      order.orderNumber = generateOrderNumber(order.createdAt);
      await order.save();
    }

    console.log(`Migration complete. Updated ${orders.length} order(s).`);
  } finally {
    await mongoose.disconnect();
  }
}

migrateOrders()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
