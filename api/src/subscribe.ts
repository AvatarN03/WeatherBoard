import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "../../inngest-fn/lib/mongo.js";
import { inngest } from "../../inngest-fn/client.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, city, lat, lon } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  if (typeof lat !== "number" || typeof lon !== "number") {
    return res.status(400).json({ error: "Invalid latitude or longitude" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("weatherboard");
    const collection = db.collection("subscribers");

    const existing = await collection.findOne({ email });
    // Already subscribed
    if (existing?.active) {
      return res.status(409).json({
        error: "Already subscribed",
      });
    }

    if (existing && !existing.active) {
      await collection.updateOne(
        { email },
        {
          $set: {
            active: true,
            city,
            lat,
            lon,
            subscribedAt: new Date(),
            unsubscribedAt: null,
          },
        },
      );

      await inngest.send({
        name: "newsletter/subscribed",
        data: { email, city }, // ← pass city to inngest
      });

      return res.status(200).json({
        success: true,
        resubscribed: true,
      });
    }

    //new subscriber
    await collection.insertOne({
      email,
      city, // ← save city
      lat, // ← save latitude
      lon, // ← save longitude
      active: true,
      subscribedAt: new Date(),
      unsubscribedAt: null,
    });

    await inngest.send({
      name: "newsletter/subscribed",
      data: { email, city }, // ← pass city to inngest
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
