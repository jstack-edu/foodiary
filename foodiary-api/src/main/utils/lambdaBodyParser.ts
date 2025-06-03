import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { BadRequest } from '@application/errors/http/BadRequest';

export function lambdaBodyParser(body: APIGatewayProxyEventV2['body']) {
  try {
    if (!body) {
      return {};
    }

    return JSON.parse(body);
  } catch {
    throw new BadRequest('Malformed body.');
  }
}
