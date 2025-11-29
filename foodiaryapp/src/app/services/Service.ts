import { env } from '@app/config/env';
import axios, { isAxiosError } from 'axios';

export abstract class Service {
  private static refreshTokenInterceptorId: number | undefined;

  protected static client = axios.create({
    baseURL: env.api.url,
  });

  static setAccessToken(accessToken: string) {
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  static removeAccessToken() {
    this.client.defaults.headers.common.Authorization = undefined;
  }

  static removeRefreshTokenHandler() {
    if (this.refreshTokenInterceptorId !== undefined) {
      this.client.interceptors.response.eject(this.refreshTokenInterceptorId);
      this.refreshTokenInterceptorId = undefined;
    }
  }

  static setRefreshTokenHandler(refreshHandler: () => Promise<void>) {
    this.removeRefreshTokenHandler();

    this.refreshTokenInterceptorId = this.client.interceptors.response.use(
      response => response,
      async (error) => {
        if (
          !isAxiosError(error)
          || error.response?.status !== 401
          || !error.config
          || error.config.url === '/auth/refresh-token'
        ) {
          return Promise.reject(error);
        }

        await refreshHandler();

        return this.client(error.config);
      },
    );
  }
}
