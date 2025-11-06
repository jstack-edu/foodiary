import { env } from '@app/config/env';
import axios from 'axios';

export abstract class Service {
  protected static client = axios.create({
    baseURL: env.api.url,
  });

  static setAccessToken(accessToken: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  static removeAccessToken() {
    this.client.defaults.headers.common.Authorization = undefined;
  }
}
