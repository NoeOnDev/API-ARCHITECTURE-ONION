import { EventType } from "../../_shared/domain/value-objects/EventType";

export interface EventMessageProvider {
  getMessage(eventType: EventType): string;
}
