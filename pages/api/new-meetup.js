// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(); //if DB doesn't exist yet, it will be created

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close(); //to close db connection once we're done.

    //res.status(201); //to indicate tha something was inserted successfully.
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
