import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "product_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database");
    return;
  }
  console.log("Connected to the database as id", +connection.threadId);
});

export default connection;
