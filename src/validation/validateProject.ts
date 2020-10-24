import { FoodInterface, TaskInterface } from "../interfaces/projectInterface";

export const validateProject = (value: FoodInterface) => {
  const { name, price, food_image } = value;
  const error: FoodInterface | any = {};
  if (!name) {
    error.name = "title field is empty";
  }
  if (!price) {
    error.price = "Price field is empty";
  }
  if (!food_image) {
    error.food_image = "Image field is empty";
  }

  return { value, error };
};
