const express = require("express");
const app = express();
const Authors = require("./Schemas/authorSchema");
const Book = require("./Schemas/bookSchema");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyparser.json());
mongoose.connect(
  "mongodb://localhost/bookcatalogue",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);

app.post("/add/author", async (req, res) => {
  try {
    let data = await Authors.create(req.body);
    res.json({
      status: "success",
      data: data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

app.post("/add/book", async (req, res) => {
  try {
    let data = await Book.find({ authorid: req.authorid });
    if (data.length > 1) {
      data = await Book.find({ authorid: req.authorid }).updateOne(
        {},
        {
          $push: {
            Books: req.body,
          },
        }
      );
    } else {
      data = await Book.create({
        Books: req.body,
        authorid: req.authorid,
      });
    }
    res.json({
      status: "Success",
      message: data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

app.get("/search/allcategories", async (req, res) => {
  try {
    let data = await await Book.find();
    // let cat=new Map();
    // let info = data.map((val) =>
    //   val.Books.map((data) => console.log(data.category);
    // //   if(cat.has(data.category)){
    // //     cat.get(dta)
    // //   })
    // );
    res.json({
      status: "Success",
      message: data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server Listening");
});
