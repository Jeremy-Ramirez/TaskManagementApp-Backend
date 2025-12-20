const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = await MongoClient.connect(MONGODB_URI);
  cachedClient = client;
  return client;
}

exports.handler = async (event) => {
  
  let body;
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (e) {
    body = event.body;
  }

  const { taskId, userId } = body;

  if (!taskId || !userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing taskId or userId" }),
    };
  }

  if (!ObjectId.isValid(taskId)) {
     return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid taskId format" }),
    };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('insightt-db'); 
    const collection = db.collection('tasks');

    const result = await collection.updateOne(
      { _id: new ObjectId(taskId), userId: userId },
      { $set: { status: "done" } } 
    );

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found or you do not have permission" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task marked as done", result }),
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal error", error: error.toString() }),
    };
  }
};