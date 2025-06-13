import ForgotPassword from '@infra/emails/templates/auth/ForgotPassword';
import { render } from '@react-email/render';
import { CustomMessageTriggerEvent } from 'aws-lambda';

export async function handler(event: CustomMessageTriggerEvent) {
  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    const confirmationCode = event.request.codeParameter;

    const html = await render(ForgotPassword({ confirmationCode }));

    event.response.emailSubject = '🍏 foodiary | Recupere a sua conta!';
    event.response.emailMessage = html;
  }

  return event;
}
