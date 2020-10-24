import { Router } from "express";
import { Auth } from "./userAuth";
import {
  createFood,
  getAllFoods,
  deleteFood,
  getAFood,
  updateAFood,
} from "../controllers/food.controller";

const router = Router();

// route to get all projects
router.get("/", async (req: any, res) => {
  const foods = await getAllFoods();
  res.json(foods);
});

// route to get a single project
router.get("/:id", async (req: any, res) => {
  const { id } = req.params;
  const food = await getAFood(id);
  res.json(food);
});

// route to create a project
router.post("/", async (req: any, res) => {
  // const { id } = req.user;

  const project = await createFood(req, req.body);

  res.json({ data: project });
});

router.put("/:id", Auth, async (req: any, res) => {
  const { id } = req.params;

  const food = await updateAFood(id, req.body);

  if (food.status === "error") {
    return res.status(404).json({ data: food });
  }

  res.json({ data: food });
});

router.delete("/:projectId", Auth, async (req: any, res) => {
  const { projectId } = req.params;

  const project = await deleteFood(projectId);

  res.json({ data: project });
});

export default router;
