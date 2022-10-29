import React,{Fragment, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './ProductReviews.css'
import { useSelector,  useDispatch} from 'react-redux'
import {clearError, allReviews,deleteReview} from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from './Sidebar'
import { useState } from 'react'
import Star from '@material-ui/icons/Star'
import {  DELETE_REVIEW_RESET } from '../../constants/productContants'

const ProductRevierws = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  // const id = useParams();
  const Navigate = useNavigate();

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId)=>{
    dispatch(deleteReview(reviewId, productId))

  }

  const productReviewSubmitHandler = (e)=>{
    e.preventDefault();

    dispatch(allReviews(productId));
  }

  const {error , reviews,loading} = useSelector((state)=>state.productReviews)
  const {error:deleteError, isDeleted} = useSelector((state) => state.reviews)

  const columns = [
    { field: 'id', headerName: 'REVIEW ID', minWidth:200, flex:0.5},
    {
      field: 'user', 
      headerName: 'User', 
      minWidth:150, 
      flex:0.3,
   },
    {
      field: 'comment', 
      headerName: 'Comment', 
      minWidth:350, 
      flex:1,
   },
   {
    field: 'rating', 
    headerName: 'Rating', 
    type: "number",
    minWidth:150, 
    flex:0.3,
    cellClassName: (params)=>{
      return(
        params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor"
      )
    } 
 },

{
  field: 'actions', 
  headerName: 'Actions', 
  type: "number",
  minWidth:150, 
  flex:0.3,
  sortable:false,
  renderCell: (params)=>{
    return (
      <Fragment>

      <Button onClick={()=>deleteReviewHandler(params.getValue(params.id, "id"))} >
        <DeleteIcon/>
      </Button>
      </Fragment>
    );

    
  },
},
  ] ;


  const rows = [];

  reviews && reviews.forEach((item)=>{
    rows.push({
      id:item._id,
      rating:item.rating,
      comment:item.comments,
      user: item.name 
     
    })
  })

  useEffect(() => {
    if(productId.length === 24){
    dispatch(allReviews(productId));

    }

    if(error){
      alert.error(error)
      dispatch(clearError())
    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearError());
    }
    if(isDeleted){
      alert.success("Review Deleted Successfully");
      Navigate("/admin/reviews")
      dispatch({type:DELETE_REVIEW_RESET});
    }
    // dispatch(allReviews())

  }, [alert, dispatch , error,deleteError, isDeleted,Navigate,productId]);

  return (
    <Fragment>
      <MetaData title={`All Reviews-- Admin`} />
      <div
      className='dashboard'>
      <Sidebar />

      <div className='productReviewContainer'>
        <h1>ALL REVIEWS</h1>
      <form 
         className='productReviewForm'
         encType='multipart/form-data'
         onSubmit={productReviewSubmitHandler}
         >

             <div>
                 <Star/>
                 <input type="text"
                         placeholder='Product Id'
                         required
                         value={productId} 
                         onChange={(e)=>setProductId(e.target.value)}
                 />
             </div>
           
             <Button id='createProductReviewBtn' type="submit" disabled={loading?true:false || productId===""?true:false} >
                 Find
             </Button>

         </form>

        

      {
        reviews && reviews.length > 0 ?   <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className='adminProductTable'
        autoHeight
      />: <h1 className='productReviewNoFound'>No Product Rviews Found</h1>
      }

      </div>

      </div>

    </Fragment>
  )
}


export default ProductRevierws