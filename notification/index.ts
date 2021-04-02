import express from "express";
import { Consumer } from "./handlers/consumer";
import {Database} from "./database";

const app = express();


// connect to DB
const db = new Database();
db.connect();


const PORT = 5000;

const consumerHandler = new Consumer();

consumerHandler.connect();

app.get("/", (req, res) => res.send("Hello from server!"));

app.listen(PORT, () => console.log(`⚡Server is  here 👉 https://localhost:${PORT}`));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  db.close()
});

process.on('SIGTERM',function() {
  db.close()
});

