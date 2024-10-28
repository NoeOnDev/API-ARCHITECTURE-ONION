export interface EventPublisher {
  publish(eventType: string, payload: any): Promise<void>;
}
