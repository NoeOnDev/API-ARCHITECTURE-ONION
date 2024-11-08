import { Pool } from "mysql2/promise";
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";
import { pool } from "../../_config/db.config";
import { RowDataPacket } from "mysql2";

export class MysqlProductRepository implements ProductRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async save(product: Product): Promise<void> {
    const query = `
      INSERT INTO products (id, title, description, unitPrice)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      product.getId(),
      product.getTitle(),
      product.getDescription(),
      product.getUnitPrice(),
    ];
    await this.pool.execute(query, values);
  }

  async findById(id: string): Promise<Product | null> {
    const query = `
      SELECT * FROM products WHERE id = ?
    `;
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) {
      const row = rows[0];
      const product = new Product(
        row.title,
        row.description,
        row.unitPrice,
        row.id
      );
      return product;
    }
    return null;
  }

  async findAll(): Promise<Product[]> {
    const query = `
      SELECT * FROM products
    `;
    const [rows] = await this.pool.execute<RowDataPacket[]>(query);
    return rows.map(
      (row) => new Product(row.title, row.description, row.unitPrice, row.id)
    );
  }

  async update(product: Product): Promise<void> {
    const query = `
      UPDATE products
      SET title = ?, description = ?, unitPrice = ?
      WHERE id = ?
    `;
    const values = [
      product.getTitle(),
      product.getDescription(),
      product.getUnitPrice(),
      product.getId(),
    ];
    await this.pool.execute(query, values);
  }

  async deleteById(id: string): Promise<void> {
    const query = `
      DELETE FROM products WHERE id = ?
    `;
    await this.pool.execute(query, [id]);
  }
}
