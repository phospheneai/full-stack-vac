const fs = require("fs");
const http = require("http");

function getTodos() {
  try {
    let todos = fs.readFileSync("todos.json", {
      encoding: "utf-8",
    });
    return todos;
  } catch (error) {
    // console.log("File Unavailable");
    return [];
  }
}

function addTodos(title, body) {
  let todos;
  try {
    todos = fs.readFileSync("todos.json", {
      encoding: "utf-8",
    });
    todos = JSON.parse(todos);
  } catch (error) {
    console.log("File Unavailable");
    todos = [];
  }

  let todo = {
    title: title,
    body: body,
  };

  todos.push(todo);

  fs.writeFileSync("todos.json", JSON.stringify(todos), {
    encoding: "utf-8",
  });
  return true;
}

let serverHandler = (req, res) => {
  //req.url = /todos?title=bdkjbvsi&body=sbgjjbogr

  let URI = req.url.split("?")[0];

  let urlparams = new URLSearchParams(req.url.split("?")[1]);
  console.log(urlparams);

  if (URI === "/todos" && req.method === "POST") {
    addTodos(urlparams.get("title"), urlparams.get("body"));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ success: true }));
    res.end();
  } else if (req.url === "/") {
    let html = fs.readFileSync("index.html", { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  } else if (req.url === "/contact") {
    let html = fs.readFileSync("contact.html", { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  } else if (req.url === "/todos") {
    let todos = getTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(todos);
    res.end();
  } else if (req.url == "/styles.css") {
    let css = fs.readFileSync("styles.css", { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(css);
    res.end();
  } else {
    let html = fs.readFileSync("404.html", { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  }
};

let server = http.createServer(serverHandler);

server.listen(8080);

// addTodos("Todo 3", "Watch some series");
// showTodos();
