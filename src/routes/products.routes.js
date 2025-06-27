import { Router } from "express";
const router= Router();



import {getAllProducts, 
    searchProduct,
    getProductById,
    createProduct,
    updateProduct,
    } from "../controllers/products.controller.js";

router.get("/products", getAllProducts );
router.get("/products/search", searchProduct );
router.get("/products/:id", getProductById );
router.post("/products",createProduct );
router.put("/products/:id", updateProduct);

router.delete("/products/:id", (req,res)=>{
    const productId =parseInt(req.params.id, 10);  // base 10
    const productIndex= products.findIndex((item)=>item.id === productId);
    if(productIndex=== -1){
        return res.status(404).json({error: "Producto no encontrado"});
    }
    products.splice(productIndex,1);  //elimina un elemento
    res.status(204).send(productIndex);

});

export default router;

