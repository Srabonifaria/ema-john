import React, { useEffect, useState } from 'react';
// import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    // const first10 = fakeData.slice(0,10)
    const [products, setProducts] = useState([]);
    const [cart,setCart] = useState([])
    const [search,setSearch] = useState('')
    document.title="Shop More"
   
    useEffect(() =>{
        fetch('https://protected-shore-23390.herokuapp.com/products?search='+search)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[search])

    useEffect(() =>{
        const savedCart =getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://protected-shore-23390.herokuapp.com/productsByKeys',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

        // console.log(products ,productKeys)
        // if(products.length > 0){
        //     const previousCart =productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey)
        //         product.quantity = savedCart[existingKey]
        //         return product;
        //     })
        //     setCart(previousCart)
        // }
    }, [])    
    const handleAddProduct = (product) => {
        const toBeaddedKey =product.key
        const sameProduct =cart.find(pd => pd.key === toBeaddedKey)
        let count = 1;
        let newCart;
        if(sameProduct) {
             count = sameProduct.quantity + 1;
             sameProduct.quantity = count;
             const others =cart.filter(pd => pd.key !== toBeaddedKey)
            newCart = [...others,sameProduct]
        }
        else{
            product.quantity =1;
            newCart =[...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count)
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            
            <input type="text" placeholder="Search" onBlur={handleSearch} className="product-search"/>    
                {
                    products.map(pd =>  <Product 
                        key ={pd.key}
                        showAddToCart={true}
                        handleAddProduct ={handleAddProduct}
                        product={pd}>
                        </Product>)
                }
            </div>
           <div className="cart-container">
               <Cart cart={cart}>
                 <Link to="/review">
                   <button className="main-button">Review Order</button>
                 </Link>
               </Cart>
           </div>
        </div>
    );
};

export default Shop;