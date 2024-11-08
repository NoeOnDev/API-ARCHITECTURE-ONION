import { CreateProduct } from "../application/CreateProduct";
import { GetAllProducts } from "../application/GetAllProducts";
import { UpdateProduct } from "../application/UpdateProduct";
import { DeleteProduct } from "../application/DeleteProduct";
import { GetProductById } from "../application/GetProductById";

import { CreateProductController } from "./http/controllers/CreateProductController";
import { GetAllProductsController } from "./http/controllers/GetAllProductsController";
import { UpdateProductController } from "./http/controllers/UpdateProductController";
import { DeleteProductController } from "./http/controllers/DeleteProductController";
import { GetProductByIdController } from "./http/controllers/GetProductByIdController";

import { MysqlProductRepository } from "./MysqlProductRepository";

const productRepository = new MysqlProductRepository();

const createProduct = new CreateProduct(productRepository);
const getAllProducts = new GetAllProducts(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);
const getProductById = new GetProductById(productRepository);

const createProductController = new CreateProductController(createProduct);
const getAllProductsController = new GetAllProductsController(getAllProducts);
const updateProductController = new UpdateProductController(updateProduct);
const deleteProductController = new DeleteProductController(deleteProduct);
const getProductByIdController = new GetProductByIdController(getProductById);

export {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getProductByIdController,
};
