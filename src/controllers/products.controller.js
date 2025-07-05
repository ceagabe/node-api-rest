
//import * as service from '../services/products.service.js'
import * as model from '../models/products.model.js'

export const getAllProducts = (req, res)=> {
    res.json(model.getAllProducts());
};

export const searchProduct = (req,res)=> {
    console.log(req.query);
    const {name}= req.query;
    const products =model.getAllProducts(); //agregue para que me traiga el array del model
    const filteredProducts =products.filter ((p)=> p.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filteredProducts); 
};

export const getProductById= (req, res)=> {
    const {id}=req.params;
    console.log(id);
    const products =model.getAllProducts();  //agregue para que me traiga el array del model
    const product=products.find((item)=> item.id == id);
    if(!product){
    res.status(404).json({Error: "No existe el producto"});
    }       
    res.json(product);
};

export const createProduct  = (req, res)=> {    
    const {name, price, categories}= req.body;
    const products =model.getAllProducts();  //agregue para que me traiga el array del model
    const newProduct= model.createProduct({name,price,categories});
    res.status(201).json(newProduct);
};



export const updateProduct =(req,res)=>{
    const products =model.getAllProducts();  //agregue para que me traiga el array del model
    const productId =parseInt(req.params.id, 10);
    const productIndex= products.findIndex((item)=>item.id === productId);
    if(productIndex=== -1){
        return res.status(404).json({error: "Producto no encontrado"});
    }
    const {name, price}= req.body;
    products[productIndex]= { id:productId,name,price};
    res.json(products[productIndex]);
    
};

export const deleteProduct= (req,res)=>{
    const productId =parseInt(req.params.id, 10);  // base 10
    const product= model.deleteProduct(productId);
   
    if(!product){
        return res.status(404).json({error: "Producto no encontrado, el producto fue borrado"});
    };
    res.status(204).send(productId);
};