import { MongoClient } from 'mongodb'
const MONGODB_URI = process.env.mongouri;

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 1,
    maxIdleTimeMS: 5000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000,
  });

  cachedDb = client.db("invisor");

  return cachedDb;
};

const queryDatabase = async (db, stock) => {
  const pokemon = await db
    .collection("predictions")
    .find({ symbol: stock })
    .toArray();
  return pokemon
};

const pushToDatabase = async (db, data) => {
  const formData = {
    symbol: data.symbol,
    close: data.close,
    pred: data.pred,
    date: data.date,
  };
  if (
    formData.symbol !== "" &&
    formData.close !== "" &&
    formData.pred !== "" &&
    formData.date !== ""
  ) {
    result = await db.collection("predictions").insertOne(formData);
    return result;
  }
};

export default async (req, res) => {
  const { stock } = req.query;
  const db = await connectToDatabase(MONGODB_URI);

  try {
    if (req.method == "GET"){
      var result = await queryDatabase(db, stock)
      res.status(200).json(result)
    }
    else if (req.method == "POST"){
      res.status(200).json(pushToDatabase(db, json(req.body)))
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};