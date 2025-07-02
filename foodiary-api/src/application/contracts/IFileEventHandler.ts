export interface IFileEventHandler {
  handle(input: IFileEventHandler.Input): Promise<void>;
}

export namespace IFileEventHandler {
  export type Input = {
    fileKey: string;
  };
}
