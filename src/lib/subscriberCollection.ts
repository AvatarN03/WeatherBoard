import clientPromise from "./mongo";

export async function getSubscribersCollection() {
  const client = await clientPromise;
  return client.db("weatherboard").collection("subscribers");
}