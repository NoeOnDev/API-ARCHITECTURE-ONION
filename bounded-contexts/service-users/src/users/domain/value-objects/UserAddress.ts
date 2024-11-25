export class UserAddress {
  constructor(private locality: string, private street: string) {}

  getLocality(): string {
    return this.locality;
  }

  getStreet(): string {
    return this.street;
  }

  toString(): string {
    return `${this.street}, ${this.locality}`;
  }
}
