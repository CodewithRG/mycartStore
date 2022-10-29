import React, { Fragment } from 'react'
import './cart.css';
import CartItemsCart  from './CartItemsCart'
import {useDispatch, useSelector} from 'react-redux'
import {addToCartIems,removeToCartIems} from '../../actions/cartAction'
import { Link, useNavigate} from 'react-router-dom';

const Cart = () => {
   
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const {cartItems} = useSelector((state)=>state.cart)
    // const cartItems = {}

    const increaseQuantity = (id, stock, quantity) =>{
        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }
        dispatch(addToCartIems(id, newQty));
    }

    const decreaseQuantity = (id,  quantity) =>{
        const newQty = quantity - 1;
        if(1 >= quantity){
            return;
        }
        dispatch(addToCartIems(id, newQty));
    }
 
const  deletCartItem = (id) =>{
dispatch(removeToCartIems(id))
}

const cheackOutHandler = ()=>{
    Navigate("/user?redirect=shipping")
}
  return (
   <Fragment>
    {cartItems.length === 0 ? 
    <div className='NoCartContainer'>
        <div>
            <p>NO CART ITEMS</p>
        </div>
        <span>
        <Link to="/products" >view product</Link>
        </span>
            
     

    </div> : 
    <Fragment>
        <div className='cartPage'>
                <div className='cartheader'>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

               
                
                   {cartItems && cartItems.map((item)=>(
                     <div className='cartContainer' key={item.product}>
                     <CartItemsCart item={item} deletCartItem = {deletCartItem}/>
                     
                     <div className='cartInput'>
                         <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                         <input type="number" value={item.quantity} readOnly />
                         <button onClick={()=>increaseQuantity(item.product,item.stock,item.quantity)}>+</button>
 
                     </div>
 
                     <p className='cartSubTotal'> {`Rs:${
                         item.price * item.quantity
                     }`}</p>
 
                 </div>
                   ))}

                <div className='cartGrossProfit'>
                    <div></div>
                    <div className='cartGrossProfitBox'>
                        <p>Gross Total</p>
                        <p>{`Rs:${
                            cartItems.reduce(
                                (acc,item)=> acc + item.price * item.quantity,0
                            )
                        }`}</p>

                    </div>
                    <div></div>
                    <div className='checkoutBtn'>

                    <button onClick={cheackOutHandler} >Check Out</button>
                    </div>

                </div>
        </div>
    </Fragment>
    }


   </Fragment>
    )
}

export default Cart