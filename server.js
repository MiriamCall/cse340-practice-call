// Import espress using ESM syntax
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
// import { path.dirname } from "path";

//create an instance of an Express application
const app = express();

//Define important variables
const mode = process.env.MODE || "production";
const port = process.env.PORT || 3000;

// Create __dirname and __filename variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

//practice in class for middleware
app.use((req, res, next) => {
  console.log(req);
  next();
});

//set the views directory
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const title = "Home Page";
  const content = "<h1>Welcome to the Home Page</h1>";
  res.render("index", { title, content, mode, port });
});

app.get("/page1", (req, res) => {
  const title = "Page 1";
  const content = "<h1>Welcome to Page 1</h1>";
  res.render("page1", { title: "Page 1" });
});

app.get("/page2", (req, res) => {
  const title = "Page 2";
  const content = "<h1>Welcome to Page 2</h1>";
  res.render("page2", { title: "Page 2" });
});

// const name = process.env.NAME;

//Define a route handler for the root URL ('/)
app.get("/", (req, res) => {
  res.send(`Hello`);
});

//Define a route handler for the root URL ('/')
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/new-route", (req, res) => {
  res.send("This is a new route!");
});

//practice in class
app.get("/explore/:name/:age/:id", (req, res) => {
  // const name = req.params.name;
  const { name, age, id } = req.params;
  res.send("Check your computers console!");
});

//Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
