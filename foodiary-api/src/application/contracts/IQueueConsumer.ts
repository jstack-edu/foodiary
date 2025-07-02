export interface IQueueConsumer<TMessage extends Record<string, unknown>> {
  process(message: TMessage): Promise<void>;
}
