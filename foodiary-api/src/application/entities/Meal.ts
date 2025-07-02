import KSUID from 'ksuid';

export class Meal {
  readonly id: string;

  readonly accountId: string;

  status: Meal.Status;

  attempts: number;

  readonly inputType: Meal.InputType;

  readonly inputFileKey: string;

  name: string;

  icon: string;

  foods: Meal.Food[];

  readonly createdAt: Date;

  constructor(attr: Meal.Attributes) {
    this.id = attr.id ?? KSUID.randomSync().string;
    this.accountId = attr.accountId;
    this.status = attr.status;
    this.inputType = attr.inputType;
    this.inputFileKey = attr.inputFileKey;
    this.attempts = attr.attempts ?? 0;
    this.name = attr.name ?? '';
    this.icon = attr.icon ?? '';
    this.foods = attr.foods ?? [];

    this.createdAt = attr.createdAt ?? new Date();
  }
}

export namespace Meal {
  export type Attributes = {
    accountId: string;
    status: Meal.Status;
    inputType: Meal.InputType;
    inputFileKey: string;
    attempts?: number;
    name?: string;
    icon?: string;
    foods?: Meal.Food[];
    id?: string;
    createdAt?: Date;
  };

  export enum Status {
    UPLOADING = 'UPLOADING',
    QUEUED = 'QUEUED',
    PROCESSING = 'PROCESSING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
  }

  export enum InputType {
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
  };
}
