import { validateProject } from "../validation/validateProject";
import { FoodInterface } from "../interfaces/projectInterface";
import { sendMail } from "../mail/mail";
import Food from "../models/food.model";
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createFood = async (req: any, food: FoodInterface) => {
  const { value, error } = validateProject(food);
  console.log("values === ", food);
  if (error.price) return { status: "error", error: error.price };
  // if (error.food_image) return { status: "error", error: error.food_image };

  try {
    if (req.files) {
      const img = await v2.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "food" },
        (err: Error, result: any) => {
          if (err) {
            console.log(err);
          }
          return result;
        }
      );
      const foodCreated = await Food.create({
        ...food,
        food_image: img.secure_url,
      });
      return { status: "success", data: foodCreated };
    }
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAllFoods = async () => {
  try {
    const foods = await Food.find();

    return { status: "success", data: foods };
  } catch (error) {
    console.log(error.message);
    return { status: "error", error: error.message };
  }
};

export const deleteFood = async (id: string) => {
  try {
    const checkExist = await Food.findById(id);
    if (!checkExist) {
      return {
        status: "error",
        message: "Not found",
      };
    }
    await Food.findByIdAndDelete(id);
    return {
      status: "success",
      message: "You have successfully delete this item",
    };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const getAFood = async (id: string) => {
  try {
    const food = await Food.findById(id);
    if (food) return { status: "success", data: food };

    return { status: "error", error: "Cant find this project" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};

export const updateAFood = async (id: number, food: any) => {
  const { value, error } = validateProject(food);
  if (error.name) return { status: "error", error: error.project_name };
  if (error.price) return { status: "error", error: error.project_identifier };
  if (error.food_image) return { status: "error", error: error.food_image };
  try {
    const checkExist = await Food.findById(id);
    if (checkExist) {
      const updateFood = await Food.findByIdAndUpdate(id, food, { new: true });
      return {
        status: "success",
        data: updateFood,
      };
    }
    return { status: "error", error: "Cant update this item" };
  } catch (error) {
    return { status: "error", error: error.message };
  }
};
