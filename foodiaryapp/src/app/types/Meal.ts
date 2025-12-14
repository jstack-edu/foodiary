export enum MealStatus {
  UPLOADING = 'UPLOADING',
  QUEUED = 'QUEUED',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum MealInputType {
  AUDIO = 'AUDIO',
  PICTURE = 'PICTURE',
}

export type Food = {
  name: string;
  quantity: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

export type Meal = {
  id: string;
  status: MealStatus;
  inputType: MealInputType;
  inputFileURL: string;
  name: string;
  icon: string;
  foods: Food[];
  createdAt: Date;
}

export type SimplifiedMeal = {
  id: string;
  createdAt: Date;
  name: string;
  icon: string;
  foods: Food[];
}
