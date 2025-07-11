// import fs from 'fs';
// import path from 'path';
//import { createProduct } from '../controllers/products.controller';

import { db } from '../data/data.js'; 
  import { 
      collection, 
      getDocs, 
      getDoc, 
      addDoc, 
      deleteDoc, 
      doc,
      query
  } from 'firebase/firestore'; 
 
const productsCollection = collection(db, 'products'); 

  

// const __dirname =import.meta.dirname;
// const dataPath = path.join(__dirname, './products.json');
// const json= fs.readFileSync(dataPath,'utf-8');
//const products= JSON.parse(json);   //esto es un objeto en js


 export async function getProductById(id) { 
    const productDoc = await getDoc(doc(productsCollection, id)); 
    if (productDoc.exists()) { 
       
        return productDoc.data(); 

    } else { 
        return null; 
    } 
  }; 

 
  // Método para obtener todos los productos 
  export async function getAllProducts() {  
    
    const querySnapshot = await getDocs(productsCollection); 
    const products = []; 
    querySnapshot.forEach((doc) => { 
        products.push({ id: doc.id, ...doc.data() }); 
    }); 
    return products; 
  }; 
 
  // Método para guardar un producto en Firestore -----cambien save por create
  export async function createProduct(product,id) { 
    await addDoc(productsCollection, product); 
  }; 
 
  export async function updateProduct(product, id) { 
    await addDoc(productsCollection, product,id); 
  }; 

  // Método para eliminar un producto por su ID 
  export async function deleteProduct(id) { 
    await deleteDoc(doc(productsCollection, id)); 

  };

// console.log(products);


// export const getAllProducts = ()=> {
//     return products;
// };

// export const getAllProductsbyId= (id) =>{
//     return products.find((item)=>item.id == id);
// };


// export const createProduct  = (data)=> {       
//     const newProduct={
//         id:products.length + 1, 
//         ...data, 
//     };
//     products.push(newProduct);
//     //res.status(201).json(newProduct);
//     fs.writeFileSync(dataPath, JSON.stringify(products));
//     console.log(newProduct);
//     return newProduct

// };

// export const deleteProduct=(id)=>{
//     const productIndex= products.findIndex((item)=>item.id === id);
//     if (productIndex == -1 ){
//         return null;
//     }else{
//     const  product = products.splice(productIndex,1);  //elimina un elemento
//     fs.writeFileSync(dataPath, JSON.stringify(products));
//      return products
//     };
   
//     //console.log(products);
// };