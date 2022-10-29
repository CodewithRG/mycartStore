import { Rating } from '@material-ui/lab'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
// import user from '../../images/user.png'

const ReviewCard = ({review}) => {
  
  const {user} = useSelector((state) => state.user)
 

const options = {
  size:"small",
  value: review.rating,

  readOnly:true,
  precision:0.5
};
  return (
   <Fragment>
      {
        <div className='review-box'>

        <img src={user.avtar.url} alt="user" />
        <h4>{review.name}</h4>
        <Rating {...options}/>

        <p>{review.comments}</p>
        </div>
      }
   </Fragment>
   
  )
}

export default ReviewCard