
import mongoose, { Schema, model } from "mongoose";

const currencySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  exchangeRate: {
    type: Number,
    required: true
  },
  foundIn: {
    type: Date,
    required: true
  }
});

const mainSchema = new Schema({

  source: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
  currencies: {
    type: [currencySchema],
    required: true
  }
});

const Model = model("Currencies", mainSchema);

export default Model;
