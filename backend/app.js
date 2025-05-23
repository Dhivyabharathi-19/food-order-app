import express from "express";
import bodyParser from "body-parser";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await readFile(
    path.join(__dirname, "data", "available-meals.json"),
    "utf8"
  );
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  const {
    email,
    name,
    street,
    city,
    "postal-code": postalCode,
  } = orderData.customer;

  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !street ||
    street.trim() === "" ||
    !postalCode ||
    postalCode.trim() === "" ||
    !city ||
    city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  const orders = await readFile(
    path.join(__dirname, "data", "orders.json"),
    "utf8"
  );
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);

  await writeFile(
    path.join(__dirname, "data", "orders.json"),
    JSON.stringify(allOrders)
  );
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});
