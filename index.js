const path = require("path");
const Express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const cors = require("cors");

const todoModel = require("./models/todo.model");

mongoose.connect("mongodb://localhost:27017/todo-app", () =>
  console.log("Mongodb connected")
);

let app = Express();

app.use("/static", Express.static(path.join(__dirname, "static")));
app.use(cors());
app.set("port", 3000);
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.listen(8080, () => console.log("Server started"));

app.get("/todos", async (req, res) => {
  let todos = await todoModel.find({});
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  let todo = await todoModel.create({
    title: req.body.title,
    body: req.body.body,
  });
  res.json({
    success: true,
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "404.html"));
// });

// function addTodos(title, body) {
//   let todos;
//   try {
//     todos = fs.readFileSync("todos.json", {
//       encoding: "utf-8",
//     });
//     todos = JSON.parse(todos);
//   } catch (error) {
//     console.log("File Unavailable");
//     todos = [];
//   }

//   let todo = {
//     title: title,
//     body: body,
//   };

//   todos.push(todo);

//   fs.writeFileSync("todos.json", JSON.stringify(todos), {
//     encoding: "utf-8",
//   });
//   return true;
// }

// let serverHandler = (req, res) => {
//   //req.url = /todos?title=bdkjbvsi&body=sbgjjbogr

//   let URI = req.url.split("?")[0];

//   let urlparams = new URLSearchParams(req.url.split("?")[1]);
//   console.log(urlparams);

//   if (URI === "/todos" && req.method === "POST") {
//     addTodos(urlparams.get("title"), urlparams.get("body"));
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ success: true }));
//     res.end();
//   } else if (req.url === "/") {
//     let html = fs.readFileSync("index.html", { encoding: "utf-8" });
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(html);
//     res.end();
//   } else if (req.url === "/contact") {
//     let html = fs.readFileSync("contact.html", { encoding: "utf-8" });
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(html);
//     res.end();
//   } else if (req.url === "/todos") {
//     let todos = getTodos();
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(todos);
//     res.end();
//   } else if (req.url == "/styles.css") {
//     let css = fs.readFileSync("styles.css", { encoding: "utf-8" });
//     res.writeHead(200, { "Content-Type": "text/css" });
//     res.write(css);
//     res.end();
//   } else {
//     let html = fs.readFileSync("404.html", { encoding: "utf-8" });
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(html);
//     res.end();
//   }
// };
