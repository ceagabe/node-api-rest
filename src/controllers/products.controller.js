
//import * as service from '../services/products.service.js'
import * as model from '../models/products.model.js'

export const getAllProducts = async (req, res)=> {
    const products = await model.getAllProducts()
    res.json(products);
};


export const searchProduct = async (req,res)=> {
    console.log(req.query);
    const {name}= req.query;
    const products = await model.getAllProducts(); //agregue para que me traiga el array del model
    const filteredProducts =products.filter ((p)=> p.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filteredProducts); 
};

export const getProductById= async (req, res)=> {
    const {id}=req.params;
    console.log(id);
    const products =await model.getAllProducts();  //agregue para que me traiga el array del model
    const product=products.find((item)=> item.id == id);
    if(!product){
    res.status(404).json({Error: "No existe el producto"});
    }       
    res.json(product);
};

export const createProduct  = async (req, res)=> {    
    const {name, price, category, stock}= req.body;
    const products =await model.getAllProducts();  //agregue para que me traiga el array del model
    const newProduct=await model.createProduct({name,price,category,stock});
    res.status(201).json(newProduct);
    console.log(newProduct);
};




export const updateProduct =async (req,res)=>{
    const products =await model.getAllProducts();  //agregue para que me traiga el array del model
    const productId =parseInt(req.params.id, 10);
    const productIndex= products.findIndex((item)=>item.id === productId);
    if(productIndex=== -1){
        return res.status(404).json({error: "Producto no encontrado"});
    }
    const {name, price, category, stock}= req.body;
    products[productIndex]= { id:productId,name,price,category,stock};
    res.json(products[productIndex]);
    
};

export const deleteProduct= async (req,res)=>{
    const products =await model.getAllProducts(); 
    const productId =parseInt(req.params.id, 10);  // base 10
          //esto va?
    const product=await model.deleteProduct(productId);
   
    if(!product){
        return res.status(404).json({error: "Producto no encontrado, el producto fue borrado"});
    };
    res.status(204).send(productId);
};
