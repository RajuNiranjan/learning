const express = require("express");
const redis = require("redis");
const { createClient } = redis;
const app = express();
const PORT = 8000;
const redisClient = createClient();

redisClient.on("error", (err) => console.log("redis error", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
})();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Redis Tutorial" });
});

app.get("/api/v1/get-products", async (req, res) => {
  const cacheKey = "products";

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("serving from Redis cache");
      return res
        .status(200)
        .json({ message: "data successfully stored in Redis Data Base" });
    }

    const response = await fetch("https://fakestoreapi.com/products?limit=5");
    const data = await response.json();

    await redisClient.set(cacheKey, JSON.stringify(data), { EX: 3600 });

    return res.status(200).json("data successfully stored in Redis Data Base");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/get-radis-data", async (req, res) => {
  try {
    const cacheData = await redisClient.get("products");
    return res.status(200).json(JSON.parse(cacheData));
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`server running at port number: ${PORT}`);
});
