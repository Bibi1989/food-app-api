import { validateProject } from "../validation/validateProject";
import Order from "../models/order.model";

export const createOrder = async (req: any, res: any) => {
  let value = req.body;
  let user = req.user;
  let id = user._doc._id;
  console.log("order === ", { value, id });
  try {
    const foodOrder = await Order.create({ ...value, user: id });
    res.json({ status: "success", data: foodOrder });
  } catch (error) {
    console.log("error >> ", error);
    res.status(400).json({ status: "error", error: error.message });
  }
};

export const getAllOrders = async (req: any, res: any) => {
  let user = req.user;
  let id = user._doc._id;
  try {
    const orders = await Order.find({ user: id });
    res.json({ status: "success", data: orders });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};
export const updateOrder = async (req: any, res: any) => {
  let value = req.body;
  try {
    const foodOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { ...value },
      { new: true }
    );

    res.json({ status: "success", data: foodOrder });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};
export const deleteOrder = async (req: any, res: any) => {
  console.log("Delete ID >> ", req.params.id);
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};
export const deleteAllOrder = async (req: any, res: any) => {
  try {
    await Order.deleteMany({});

    res.json({ status: "success", message: "Clear All successfully" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};
