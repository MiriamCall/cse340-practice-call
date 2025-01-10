// Import espress using ESM syntax
import express from "express";

//create an instance of an Express application
const app = express();

const name = process.env.NAME;

//Define a route handler for the root URL ('/)
app.get("/", (req, res) => {
  res.send(`Hello, ${name}!`);
});

//Define a route handler for the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/new-route", (req, res) => {
  res.send("This is a new route!");
});

//Define the port number the server will listen
const port = 3000;

//Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
