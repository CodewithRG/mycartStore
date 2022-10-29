import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import './paySuccess.css'
import { Typography } from '@material-ui/core'
import {Link} from 'react-router-dom'

const PaySuccess = () => {
  return (
    <div className='paySuccess'>
        
           <div>
            
            <CheckCircleIcon/>
            </div> 
            <Typography>Your Order has been Placed Successfully </Typography>
            <Link to={"/orders/me"}>View Order</Link>
        
    </div>
  )
}

export default PaySuccess