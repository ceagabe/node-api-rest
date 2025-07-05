import fs from 'fs';
import path from 'path';
//import { createProduct } from '../controllers/products.controller';

const __dirname =import.meta.dirname;
const dataPath = path.join(__dirname, './products.json');

const json= fs.readFileSync(dataPath,'utf-8');


const products= JSON.parse(json);   //esto es un objeto en js
console.log(products);

export const getAllProducts = ()=> {
    return products;

};

export const getAllProductsbyId= (id) =>{
    return products.find((item)=>item.id == id);
};


export const createProduct  = (data)=> {       
    const newProduct={
        id:products.length + 1, 
        ...data, 
    };
    products.push(newProduct);
    //res.status(201).json(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(products));
    console.log(newProduct);
    return newProduct

};