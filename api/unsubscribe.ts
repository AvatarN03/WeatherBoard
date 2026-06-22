import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "./inngest-fn/lib/mongo.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { email } = req.body;

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      error: "Invalid email",
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("weatherboard");
    const collection = db.collection("subscribers");

    const subscriber = await collection.findOne({
      email,
    });

    if (!subscriber) {
      return res.status(404).json({
        error: "Subscriber not found",
      });
    }

    if (!subscriber.active) {
      return res.status(200).json({
        success: true,
        message: "Already unsubscribed",
      });
    }

    await collection.updateOne(
      { email },
      {
        $set: {
          active: false,
          unsubscribedAt: new Date(),
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully unsubscribed",
    });
  } catch (error) {
    console.error("Unsubscribe Error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}