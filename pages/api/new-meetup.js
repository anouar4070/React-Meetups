import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://ahmed:ahmedanouar@cluster0.yixb9.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close(); //to close db connection once we're done.

    //res.status(201); //to indicate tha something was inserted successfully.
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
