import React from 'react';
// import fakeData from '../../fakeData';

const ManageInventory = () => {
    const handleAddProduct = () => {
        const product = {}
        fetch('https://protected-shore-23390.herokuapp.com/addProduct',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
    <div>
        <form action="">
            <p><span>Name:</span><input type="text"/></p>
            <p><span>Price:</span><input type="text"/></p>
            <p><span>Quantity:</span><input type="text"/></p>
            <p><span>Product Image</span><input type="file"/></p>
        <button onClick={handleAddProduct}>Add Product</button>
        </form>
       
    </div>
    );
};

export default ManageInventory;