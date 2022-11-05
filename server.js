const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Post = require("./db");

const app = express();
const PORT = process.env.PORT || 4455;
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let connectionString = `mongodb+srv://admin:admin@crudcluster.zjkmt.mongodb.net/evening_taskdb?retryWrites=true&w=majority`;

mongoose.connect(connectionString, (err) => {
  if (err) throw err;
  console.log("mongo was connected...");
});

app.get("/", async (req, res) => {
  let posts = await Post.find();
  console.log("Post", posts);
  posts = posts.map((p) => ({
    ...p._doc,
    createdAt: new Date(p.createdAt).toDateString(),
  }));
  console.log(posts);
  res.render("dashboard", { posts });
});

app.post("/addtask", async (req, res) => {
  req.body.postedBy = req.body.postedBy == "" ? "anonymous" : req.body.postedBy;
  console.log("Body", req.body);

  await Post.create(req.body);
  //   res.json({ status: 200, msg: "got the payload!" });
  res.redirect("/");
});

app.put("/update/:id", async (req, res) => {
  console.log("-- /update/:id fired", req.body);
  let updatedData = await Task.findOneAndUpdate(req.body);
  //   res.json({ status: 200, msg: "task updated!" });
  res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
  console.log("-- /delete/:id fired", req.body);
  await Task.findOneAndDelete({ _id: req.body.id });
  res.redirect("/");
});

app.listen(PORT, console.log(`Listening in in port ${PORT}`));
