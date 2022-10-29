import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loading from '../layout/Loader/loading'
import MetaData from '../layout/MetaData'
import {addToCartIems} from '../../actions/cartAction'
import { useAlert } from "react-alert";
import  { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productContants";


const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert()

  const  [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const increaseQuantity = () =>{
    if(product.stock > quantity){
      const qty = quantity + 1;
      setQuantity(qty);
    }
  }
  function decreaseQuantity(){
 
    if(quantity > 1){
    const  qty = quantity - 1;
       setQuantity(qty);
    }
  }

  const addToCartHandler = () =>{
    dispatch(addToCartIems(id,quantity))
    // console.log("ADDED")
    alert.success("Item Added to Cart")
  }


  const submitReviewToggle = () =>{
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = ()=>{
    const myForm = new FormData();
    myForm.set("rating", rating)
    myForm.set("comments", comment)
    myForm.set("productId", id)


    dispatch(newReview(myForm))
    // alert.success("Go on...")
    setOpen(false)

  }

  useEffect(() => {

    if(error){
      alert.error(error)
      dispatch(clearError())
    }

    if(reviewError){
        alert.error(reviewError)
        dispatch(clearError())
    }
    if(success){
      alert.success("Review Submit Succcessfully")
      dispatch({type: NEW_REVIEW_RESET})
    }

    dispatch(getProductDetails(id));
    console.log("ProductDetails:")
    
  }, [dispatch,error,id,reviewError, alert, success]);


  const options = {
    size:"small",
    value: product.ratings,
    readOnly:true,
    precision:0.5
  };
  return (
<Fragment>
    {
      loading ? <Loading/> :
      <Fragment>
      <MetaData title={`${product.name} -- MyCart`} />

        <div className="ProductDetails">
          <div className="ProductDetails-size center">
            <Carousel>
              {product.Images &&
                product.Images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`Slide${i}`}
                  />
                ))}
            </Carousel>
          </div>
  
          <div className="ProductDetails-size ">
            <div className="DetailsBlock-1">
              <h3>{product.name}</h3>
              <p>Product #{product._id}</p>
            </div>
  
            <div className="DetailsBlock-2">
              <Rating {...options} />
              <span className="DetailsBlock-2-span" >({product.numOfReviews} Reviews)</span>
            </div>
  
            <div className="DetailsBlock-3">
              <h4>{`Rs ${product.price}`}</h4>
              <div className="DetailsBlock-3-1">
                <div className="DetailsBlock-3-1-1">
                  <button className="plusMins" onClick={decreaseQuantity}>-</button>
                  <input id="input-plusmins" readOnly value={quantity} type="number"  />
                  <button className="plusMins" onClick={increaseQuantity}>+</button>
                </div>
                <div>
                  <button disabled={product.stock < 1 ? true : false } className="AddToCart" onClick={addToCartHandler} >Add to Cart</button>
                </div>
              </div>
              <p id="Stock">
                States:{" "}
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                </b> 
              </p>
            </div>
  
            <div className="DetailsBlock-4">
              Description : <p>{product.description}</p>
            </div>
            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
          </div>
        </div>
        <div className="Reviews-heading">
          <div>REVIEWS</div>
        </div>

        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle} >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog" >
            <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size="large" />
            <textarea className="submitDialogTextarea" cols="30" rows="5" value={comment} onChange={(e)=>setComment(e.target.value)}  >

            </textarea>

            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary" >Cancel</Button>
              <Button color='primary' onClick={reviewSubmitHandler} >Submit</Button>
            </DialogActions>

          </DialogContent>

        </Dialog>


  
        <div className="review-main">
          {product.reviews && product.reviews[0] ? (
            product.reviews.map((review) => <ReviewCard review={review} />)
          ) : (
            <div className="noReview">
              <p>No Review Yet</p>
            </div>
          )}
        </div>
  
       
      </Fragment>
      
    }
</Fragment>

  );
};

export default ProductDetails;
