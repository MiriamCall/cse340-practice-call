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

// Global middleware to set a custom header
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Express Middleware Tutorial");
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

//practice in class for middleware
app.use((req, res, next) => {
  console.log(req);
  next();
});

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next(); // Pass control to the next middleware or route
});

//set the views directory
app.set("views", path.join(__dirname, "views"));

// ID validation middleware
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send("Invalid ID: must be a number.");
  }
  next(); // Pass control to the next middleware or route
};

// Omitted the ID validation middleware for brevity

// Middleware to validate name
const validateName = (req, res, next) => {
  const { name } = req.params;
  if (!/^[a-zA-Z]+$/.test(name)) {
    return res.status(400).send("Invalid name: must only contain letters.");
  }
  next();
};

// Account page route with ID and name validation
app.get("/account/:name/:id", validateId, validateName, (req, res) => {
  const title = "Account Page";
  const { name, id } = req.params;
  const isEven = id % 2 === 0 ? "even" : "odd";
  const content = `
      <h1>Welcome, ${name}!</h1>
      <p>Your account ID is ${id}, which is an ${isEven} number.</p>
  `;
  res.render("index", { title, content, mode, port });
});

// Global middleware to add a timestamp to the request object
app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  next();
});

//Need to finish
// Account page route with ID and name validation
app.get("/account/:name/:id", validateName, validateId, (req, res) => {
  // Existing code omitted for brevity
  const timestamp = req.timestamp;
  // Update your content to include the timestamp
  res.render("index", { title, content, mode, port });
});

//Home page
app.get("/", (req, res) => {
  const title = "Home Page";
  const content = "<h1>Welcome to the Home Page</h1>";
  const mode = process.env.MODE;
  const port = process.env.PORT;
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

//account page (need to finish)
app.get("/account/:name/:id", (req, res) => {
  const title = "Account Page";
  const { name, id } = req.params;
  const content = "Welcome, ${name}! Your  account ID is ${id}";
  res.render("index", { title, content, mode, port });
});

//When in development mode, start a WebSocket server for live reloading
if (mode.includes("dev")) {
  const ws = await import("ws");

  try {
    const wsPort = parseInt(port) + 1;
    const wsServer = new ws.WebSocketServer({ port: wsPort });
    wsServer.on("listening", () => {
      console.log(`WebSocket server is running on port ${wsPort}`);
    });
    wsServer.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  } catch (error) {
    console.error("Failed to start WebSocket server:", error);
  }
}

//Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
