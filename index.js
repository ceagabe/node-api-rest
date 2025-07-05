
import express from "express";
import cors from "cors";


const app = express();

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(cors());
app.use(express.json());  //midleware para el post


app.get("/", (req, res)=> {
    res.json ({Message: 'API Rest en Node.js'});
});


import productsRouter from './src/routes/products.routes.js';
app.use('/api', productsRouter);


app.use((req,res, next)=> {
    res.status(404).json({error:"Not found"})
});

const PORT= 3000;
app.listen(PORT, ()=> console.log ( `http://localhost:${PORT}`));
 