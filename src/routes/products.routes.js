import { Router } from "express";
const router= Router();

import {getAllProducts, 
    searchProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products.controller.js";

router.get("/products", getAllProducts);
router.get("/products/search", searchProduct);
router.get("/products/:id", getProductById);
router.post("/products",createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id",deleteProduct);

export default router;

