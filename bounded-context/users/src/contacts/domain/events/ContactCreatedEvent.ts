export class ContactCreatedEvent {
  constructor(
    public readonly contactId: string,
    public readonly email: string,
    public readonly phone: string
  ) {}
}
