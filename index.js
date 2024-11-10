import express from "express";
import "dotenv/config";
import cors from "cors";
import connection from "./db.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  try {
    res.send("Hello world");
  } catch (error) {
    next(error);
  }
});

app.get("/products", (req, res) => {
  const query = `SELECT * FROM products`;

  connection.query(query, (err, reults) => {
    if (err) {
      console.error("Error fetching users:", err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(reults);
  });
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  console.log(name, price);
  const query = `INSERT INTO products (name,price) VALUES (?,?)`;
  connection.query(query, [name, price], (err, results) => {
    if (err) {
      console.error("Error adding product:", err.stack);
      res.status(500).send("Error adding user");
    }
    res.status(200).send("Product was added successufully");
  });
});

app.post("/user", (req, res, next) => {
  try {
    const { name, email } = req.body;
    console.log(name, email);
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Поля 'name' и 'email' обязательны" });
    }
    res.json({ message: `name ${name}, email ${email}` });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Samthing went wrong", error: err.message });
});

app.listen(port, () => {
  console.log(`Server running in http://127.0.0.1:${port}`);
});
