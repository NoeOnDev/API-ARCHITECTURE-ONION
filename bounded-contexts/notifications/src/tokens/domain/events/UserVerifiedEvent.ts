import { Identifier } from "../../../_shared/domain/value-objects/Identifier";

export class UserVerifiedEvent {
  constructor(public readonly userId: Identifier) {}
}
