import { Injectable } from '@kernel/decorators/Injectable';

type CompensationFn = () => Promise<void>;

@Injectable()
export class Saga {
  private compensations: (CompensationFn)[] = [];

  addCompensation(fn: CompensationFn) {
    this.compensations.unshift(fn);
  }

  async run<TResult>(fn: () => Promise<TResult>) {
    try {
      return await fn();
    } catch (error) {
      await this.compensate();
      throw error;
    }
  }

  async compensate() {
    for await (const compensation of this.compensations) {
      try {
        await compensation();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }
}
