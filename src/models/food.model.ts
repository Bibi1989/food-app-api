import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is a require field"],
  },
  categories: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  food_image: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("food", FoodSchema);
