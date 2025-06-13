import express from "express";
const app = express();

const products= [
    {id:1,name:"product 1", price: 100},
    {id:2,name:"product 2", price: 100},
    {id:3,name:"product 3", price: 100},
    {id:4,name:"product 3", price: 100},
];

app.get("/products", (req, res)=> {
    res.json(products);
});

app.get("/products/:id", (req, res)=> {
    console.log(req.params.id);
    const product=products.find((item)=> item.id== req.params.id)
    res.json(product);
});


app.get("/", (req, res) => {
    res.send ('<h1> Hola API  </h1>');

});
const PORT= 3000;

app.listen(PORT, ()=> console.log ( `http://localhost:${PORT}`));
