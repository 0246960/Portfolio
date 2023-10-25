const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  const name = req.query.name;
  const securityLevel = "unsecured";
  res.send(`Welcome, ${name}! (Security Level: ${securityLevel})`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const securityLevel = "secured";
  res.send(`Welcome, ${name}! (Security Level: ${securityLevel})`);
});

let posts = [];
let nextPostId = 1;

app.post("/add-post", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const post = { id: nextPostId, title, content };
    posts.push(post);
    nextPostId++;
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    const userName = req.query.name; 
    res.render("home", { userName, posts });
});

app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (post) {
      res.render("post", { post });
  } else {
      res.redirect("/home");
  }
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});