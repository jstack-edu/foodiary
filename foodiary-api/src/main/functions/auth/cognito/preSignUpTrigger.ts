import { PreSignUpTriggerEvent } from 'aws-lambda';

export async function handler(event: PreSignUpTriggerEvent) {
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;

  return event;
}
