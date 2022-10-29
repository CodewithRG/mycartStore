import React from 'react'
import './contectUs.css'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import Owner from '../../images/R.jpg'
import { Link } from 'react-router-dom'

const ContectUs = () => {
  return (
    <div className="aboutContainer">
        <h4 className='AboutHeading'>CONTECT US</h4>
          <div className='aboutContainerBox'>
            <div>
              <span>
                <img src={Owner} alt="" />
                <p>Founder and CEO  <span className='t-color'>Ravi Gupta</span></p>
              </span>
                <p><span className='t-color'>M E R N</span> FULL STACK DEVELOPER</p>
            </div>

            <div>

              <Link to="https://www.instagram.com/ravi_6upta/" >
              <div>
              <InstagramIcon/>
               <p>Instagram</p>
              </div>
              </Link>

             <a href="https://www.instagram.com/ravi_6upta/" rel="noreferrer" target="_blank" >
             <div>
              <FacebookIcon/>
               <p>Facebook</p>
              </div>
             </a>
            </div>

          </div>
    </div>
  )
}



export default ContectUs