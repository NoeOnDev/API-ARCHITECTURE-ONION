import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getProductByIdController,
} from "../../dependencyInjection";

const productRoutes = Router();

productRoutes.post(
  "/products",
  createProductController.handle.bind(createProductController)
);
productRoutes.get(
  "/products",
  getAllProductsController.handle.bind(getAllProductsController)
);
productRoutes.get(
  "/products/:id",
  getProductByIdController.handle.bind(getProductByIdController)
);
productRoutes.put(
  "/products/:id",
  updateProductController.handle.bind(updateProductController)
);
productRoutes.delete(
  "/products/:id",
  deleteProductController.handle.bind(deleteProductController)
);

export { productRoutes };
