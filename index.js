import express from "express";
import cors from "cors";

const app = express();

const products= [
    {id:1,name:"uno", price: 100},
    {id:2,name:"dos", price: 100},
    {id:3,name:"tres", price: 100},
    {id:4,name:"cuatro", price: 100},
];
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(cors());
app.use(express.json());  //midleware para el post

app.get("/", (req, res)=> {
    res.json ({Message: 'API Rest en Node.js'});
});


app.get("/products", (req, res)=> {
    res.json(products);
});


app.get("/products/search", (req,res)=> {
    console.log(req.query);
    const {nombre}= req.query;
    const filteredProducts =products.filter ((item)=> item.name.toLowerCase().includes(nombre.toLowerCase()) 

    );
    res.json(filteredProducts);
});


app.get("/products/:id", (req, res)=> {
    const {id}=req.params;
    console.log(id);
    const product=products.find((item)=> item.id == id);

    if(!product){
    res.status(404).json({Error: "No existe el producto"});
    }       
    res.json(product);
});

app.post("/products", (req, res)=> {
    console.log(req.body);
    const {name, price}= req.body;
    const newProduct={
        id:products.length + 1, 
        name,
        price,   
    };
    products.push(newProduct);
    res.status(201).json(newProduct)
});

app.put("/products/:id", (req,res)=>{
    const productId =parseInt(req.params.id, 10);
    const productIndex= products.findIndex((item)=>item.id === productId);
    if(productIndex=== -1){
        return res.status(404).json({error: "Producto no encontrado"});
    }
    const {name, price}= req.body;
    products[productIndex]= { id:productId,name,price};
    res.json(products[productIndex]);
    
});

app.delete("/products/:id", (req,res)=>{
    const productId =parseInt(req.params.id, 10);  // base 10
    const productIndex= products.findIndex((item)=>item.id === productId);
    if(productIndex=== -1){
        return res.status(404).json({error: "Producto no encontrado"});
    }
    products.splice(productIndex,1);  //elimina un elemento
    res.status(204).send(productIndex);

});

const PORT= 3000;
app.listen(PORT, ()=> console.log ( `http://localhost:${PORT}`));
 