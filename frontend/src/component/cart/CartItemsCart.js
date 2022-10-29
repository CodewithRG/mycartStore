import React from 'react'
import './CartItemsCart.css'
import { Link } from 'react-router-dom'
const CartItemsCart = ({item,deletCartItem}) => {
  return (
    <div className='CartItemsCart'>
        <img src={item.image} alt="img" />
        <div>
            <Link to={`/product/${item.product}`} >{item.name}</Link>
            <span>{`Rs: ${item.price}`}</span>
            <p onClick={()=>deletCartItem(item.product)}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemsCart