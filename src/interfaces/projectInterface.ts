export interface FoodInterface {
  name: string;
  price: number;
  food_image: string;
}

export interface TaskInterface {
  summary: string;
  status: string;
  priorty: string;
  project_sequence?: string;
  due_date: string;
  ProjectId: number;
}
