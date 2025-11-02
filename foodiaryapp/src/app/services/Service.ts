import { env } from '@app/config/env';
import axios from 'axios';

export abstract class Service {
  protected static client = axios.create({
    baseURL: env.api.url,
  });
}
