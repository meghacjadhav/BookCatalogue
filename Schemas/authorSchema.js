const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  authorid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  BirthDate: { type: Date, required: true },
  DeathDate: { type: Date, required: true },
});

const Authors = mongoose.model("Authors", AuthorSchema);

module.exports = Authors;
