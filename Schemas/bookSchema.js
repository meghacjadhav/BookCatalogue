const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  Books: [
    {
      bookid: { type: String, required: true },
      title: { type: String, required: true },
      publisher: { type: String, required: true },
      publishdate: { type: Date, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      soldCount: { type: Number, required: true },
    },
  ],

  authorid: { type: mongoose.Schema.Types.ObjectId, ref: "Authors" },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
