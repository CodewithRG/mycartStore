import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
import NotFoundIcon from '@material-ui/icons/Error'

const NotFound = () => {
  return (
    <div className='notFoundContainer'>
        <div>
            <NotFoundIcon/>
            <p>Page Not Found</p>
            <Link to="/" >
                <span>Home</span>
            </Link>
        </div>

    </div>
  )
}

export default NotFound