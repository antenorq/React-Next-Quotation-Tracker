const mongoose = require("mongoose");
const { Schema } = mongoose;

const quotationSchema = new Schema(
  {
    //customerId: mongoose.ObjectId,
    customerId: { type: mongoose.ObjectId, ref: "Customer" },
    //userId: mongoose.ObjectId,
    userId: { type: mongoose.ObjectId, ref: "User" },
    status: String,
    quoteGiven: Number,
    date: Date,
    followUp: Date,
    quoteDetails: String,
    location: String,
    file: String,
  },
  { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;
