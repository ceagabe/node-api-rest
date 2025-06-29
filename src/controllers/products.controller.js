
const products= [
    {id:1,name:"uno", price: 100},
    {id:2,name:"dos", price: 100},
    {id:3,name:"tres", price: 100},
    {id:4,name:"cuatro", price: 100},
];


export const getAllProducts = (req, res)=> {
    res.json(products);
};
export const searchProduct = (req,res)=> {
    console.log(req.query);
    const {nombre}= req.query;
    const filteredProducts =products.filter ((p)=> p.name.toLowerCase().includes(nombre.toLowerCase()) 
    );
    res.json(filteredProducts); 
};

export const getProductById= (req, res)=> {
    const {id}=req.params;
    console.log(id);
    const product=products.find((item)=> item.id == id);
    if(!product){
    res.status(404).json({Error: "No existe el producto"});
    }       
    res.json(product);
};

export const createProduct  = (req, res)=> {
    console.log(req.body);
    const {name, price}= req.body;
    const newProduct={
        id:products.length + 1, 
        name,
        price,   
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

export const updateProduct =(req,res)=>{
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
    const productIndex= products.findIndex((item)=>item.id === productId);
    if(productIndex=== -1){
        return res.status(404).json({error: "Producto no encontrado, el producto fue borrado"});
    }
    products.splice(productIndex,1);  //elimina un elemento
    res.status(204).send(productIndex);

};