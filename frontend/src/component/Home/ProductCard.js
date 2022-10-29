import React from 'react'
import './ProductCard.css'
import {Link} from 'react-router-dom'
import { Rating } from '@material-ui/lab'
// import images from '../../images/Shirt2.webp'


function Product({product}) {
    const options = {
        size:"small",
        // activeColor:"tomato",
        value:product.ratings,
        readOnly:true,
        precision:0.5
    }
    // const img = product.Images[0].url;
    // console.log( "image :",img)
  return (
   <Link className='productCart' to={`/product/${product._id}`}>
    <img src={product.Images[0].url} alt="images" />
    <p>{product.name}</p>
    <div>
        <Rating  {...options} />
        <span className='productCart-span '>({product.numOfReviews}Reviews)</span>
    </div>
    <span>
        <span className='overPrice'  >Rs {product.price+1000} </span>
        Rs {product.price}
    </span>
   </Link>
  )
}

export default Product