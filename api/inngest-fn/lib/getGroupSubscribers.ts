import type { LocationGroup } from "../../../src/types.js";
import clientPromise from "./mongo.js";



export async function getGroupedSubscribers(): Promise<LocationGroup[]> {
  const client = await clientPromise;
  const db = client.db("weatherboard");

  return db
    .collection("subscribers")
    .aggregate<LocationGroup>([
      { $match: { active: true } },
      {
        $group: {
          _id: {
            // Round to 2dp (~1.1km tile) directly in Mongo
            lat: { $round: [{ $toDouble: "$lat" }, 2] },
            lon: { $round: [{ $toDouble: "$lon" }, 2] },
          },
          lat: { $first: { $round: [{ $toDouble: "$lat" }, 2] } },
          lon: { $first: { $round: [{ $toDouble: "$lon" }, 2] } },
          subscribers: {
            $push: { email: "$email", city: "$city" },
          },
        },
      },
      // Optional: sort so biggest groups run first
      { $sort: { "subscribers": -1 } },
    ])
    .toArray();
}