export class Product {
  private id: string;
  private title: string;
  private description: string;
  private unitPrice: number;

  constructor(
    title: string,
    description: string,
    unitPrice: number,
    id?: string
  ) {
    this.id = id || crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.unitPrice = unitPrice;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getUnitPrice(): number {
    return this.unitPrice;
  }

  updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error("Price must be greater than zero.");
    }
    this.unitPrice = newPrice;
  }
}
