import React from 'react'
import './aboutUs.css'
import Owner from '../../images/R.jpg'

const AboutUs = () => {
  return (
    <div className="aboutContainer">
        <h4 className='AboutHeading'>ABOUT US</h4>
          <div className='aboutContainerBox'>
            <div>
              <span>
                <img src={Owner} alt="" />
                <p>Founder and CEO  <span className='t-color'>Ravi Gupta</span></p>
              </span>
                <p><span className='t-color'>MyCart</span> Give The Best Quality</p>
            </div>
            <div>
             <p><span className='t-color'>HELLO</span> , <br/>  I am Programmer , I used in this project Node js , ReactJs, MongoDB , Express Js , Redux etc Its a <span className='t-color'> Full E-Commerce Web Application</span>  . We can Sell So many Catogary is this Application.</p>
            </div>

          </div>
    </div>
  )
}

export default AboutUs