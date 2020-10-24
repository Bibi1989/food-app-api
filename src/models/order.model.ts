import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is a require field"],
    unique: true,
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
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  isPurchase: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  foodId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "food",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("order", OrderSchema);
