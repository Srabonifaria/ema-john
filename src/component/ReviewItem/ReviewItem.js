import React from 'react';

const ReviewItem = (props) => {
    
    const {name,quantity,key,price} =props.product;
    const reviewItemStyle ={
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h1 className="product-name">{name}</h1>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>
            <button
             className="main-button"
             onClick={() => props.removeProduct(key)}
             >Remove</button>
        </div>
    );
};

export default ReviewItem;