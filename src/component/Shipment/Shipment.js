import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const [shippingData,setShippingData] = useState(null)
    const onSubmit = data => {
     setShippingData(data)

    };

    const handlePaymentSuccess = paymentId => {
      const saveCart = getDatabaseCart();
      const orderDetails = {
        ...loggedInUser,
         products: saveCart,
          shipment: shippingData, 
          paymentId,
          orderTime: new Date()};
      // console.log(orderDetails)
      fetch('http://localhost:5000/addOrder', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('Your Order have been successfully');
      }
    })
    }
  
      // console.log(watch("example"));
  
    return (
      <div className="row">
        <div style={{display: shippingData ? 'none' :'block'}} className="col-md-6">
        <form className="ship-from" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })}  placeholder="Your name"/>
        {errors.name && <span className="error">Name is required</span>}
        
        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
        {errors.email && <span className="error">Email is required</span>}
        
        <input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} placeholder="Your address" />
        {errors.address && <span className="error">Address is required</span>}
        
        <input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder="Your phone number" />
        {errors.phone && <span className="error">Phone is required</span>}
        <input type="submit" />
      </form>
        </div>
        <div  style={{display: shippingData ? 'block' :'none'}} className="col-md-6">
          <h2>Pay here</h2>
          <ProcessPayment handlePayment ={handlePaymentSuccess}></ProcessPayment>
       </div>
      </div>
    );
};

export default Shipment;