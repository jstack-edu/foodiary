import { Injectable } from '@kernel/decorators/Injectable';
import { env } from './env';

@Injectable()
export class AppConfig {
  readonly auth: AppConfig.Auth;

  readonly db: AppConfig.Database;

  constructor() {
    this.auth = {
      cognito: {
        client: {
          id: env.COGNITO_CLIENT_ID,
          secret: env.COGNITO_CLIENT_SECRET,
        },
        pool: {
          id: env.COGNITO_POOL_ID,
        },
      },
    };

    this.db = {
      dynamodb: {
        mainTable: env.MAIN_TABLE_NAME,
      },
    };
  }
}

export namespace AppConfig {
  export type Auth = {
    cognito: {
      client: {
        id: string;
        secret: string;
      };
      pool: {
        id: string;
      };
    };
  };

  export type Database = {
    dynamodb: {
      mainTable: string;
    };
  };
}
