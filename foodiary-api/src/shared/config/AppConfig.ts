import { Injectable } from '@kernel/decorators/Injectable';
import { env } from './env';

@Injectable()
export class AppConfig {
  readonly auth: AppConfig.Auth;

  readonly db: AppConfig.Database;

  readonly storage: AppConfig.Storage;

  readonly cdns: AppConfig.CDNs;

  readonly queues: AppConfig.Queues;

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

    this.storage = {
      mealsBucket: env.MEALS_BUCKET,
    };

    this.cdns = {
      mealsCDN: env.MEALS_CDN_DOMAIN_NAME,
    };

    this.queues = {
      mealsQueueUrl: env.MEALS_QUEUE_URL,
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

  export type Storage = {
    mealsBucket: string;
  };

  export type CDNs = {
    mealsCDN: string;
  };

  export type Queues = {
    mealsQueueUrl: string;
  };
}
