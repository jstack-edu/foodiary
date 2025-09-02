/* eslint-disable no-console */
import OpenAI, { toFile } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';

import { Meal } from '@application/entities/Meal';
import { MealsFileStorageGateway } from '@infra/gateways/MealsFileStorageGateway';
import { Injectable } from '@kernel/decorators/Injectable';
import { ChatCompletionContentPart } from 'openai/resources/index';
import { downloadFileFromURL } from 'src/utils/downloadFileFromURL';
import z from 'zod';
import { getImagePrompt } from '../prompts/getImagePrompt';
import { getTextPrompt } from '../prompts/getTextPrompt';

const mealSchema = z.object({
  name: z.string(),
  icon: z.string(),
  foods: z.array(z.object({
    name: z.string(),
    quantity: z.string(),
    calories: z.number(),
    carbohydrates: z.number(),
    fats: z.number(),
    proteins: z.number(),
  })),
});

@Injectable()
export class MealsAIGateway {
  constructor(private readonly mealsFileStorageGateway: MealsFileStorageGateway) { }

  private readonly client = new OpenAI();

  async processMeal(meal: Meal): Promise<MealsAIGateway.ProcessMealResult> {
    const mealFileURL = this.mealsFileStorageGateway.getFileURL(meal.inputFileKey);

    if (meal.inputType === Meal.InputType.PICTURE) {
      return this.callAI({
        mealId: meal.id,
        systemPrompt: getImagePrompt(),
        userMessageParts: [
          {
            type: 'image_url',
            image_url: {
              url: mealFileURL,
              detail: 'high',
            },
          },
          {
            type: 'text',
            text: `Meal date: ${meal.createdAt}`,
          },
        ],
      });
    }

    const transcription = await this.transcribe(mealFileURL);

    return this.callAI({
      mealId: meal.id,
      systemPrompt: getTextPrompt(),
      userMessageParts: `Meal date: ${meal.createdAt}\n\nMeal: ${transcription}`,
    });
  }

  private async callAI({
    mealId,
    systemPrompt,
    userMessageParts,
  }: MealsAIGateway.CallAIParams): Promise<MealsAIGateway.ProcessMealResult> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4.1-mini',
      response_format: zodResponseFormat(mealSchema, 'meal'),
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessageParts,
        },
      ],
    });

    const json = response.choices[0].message.content;

    if (!json) {
      console.error('OpenAI response:', JSON.stringify(response, null, 2));
      throw new Error(`Failed processing meal "${mealId}"`);
    }

    const { success, data, error } = mealSchema.safeParse(JSON.parse(json));

    if (!success) {
      console.log('Zod error:', JSON.stringify(error.issues));
      console.error('OpenAI response:', JSON.stringify(response, null, 2));
      throw new Error(`Failed processing meal "${mealId}"`);
    }

    return data;
  }

  private async transcribe(audioFileURL: string) {
    const audioFile = await downloadFileFromURL(audioFileURL);

    const { text } = await this.client.audio.transcriptions.create({
      model: 'gpt-4o-mini-transcribe',
      file: await toFile(audioFile, 'audio.m4a', { type: 'audio/m4a' }),
    });

    return text;
  }
}

export namespace MealsAIGateway {
  export type ProcessMealResult = {
    name: string;
    icon: string;
    foods: Meal.Food[];
  }

  export type CallAIParams = {
    mealId: string;
    systemPrompt: string;
    userMessageParts: string | ChatCompletionContentPart[];
  }
}
