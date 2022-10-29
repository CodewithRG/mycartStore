import React from 'react'
import './Footer.css'
import logo from '../../../images/mycartLogo.png';
const Footer = () => {
  return (
    <div>
          <footer className=' p-0 m-0'>
    <div className="container-fluid  bg-color  text-color m-top">
        <div className="row pt-4 pb-4 font">
            <div className="col-md-4 col-sm-4 col-12 ">

                <div className="left text-center">
                    <img src={logo} alt="logo" width={150} />
                    <p className="mt-2 fw-bold font headColer">Welcome to MyCart</p>

                </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12 ">
                <div className="mid">
                    <div className="mt-4">
                    <p className="text-center "><span className='headColer'>MyCart </span> THE BEST QUALITY</p>
                    <p className="text-center fw-semibold  ">Copyrights 2022 @<span className='headColer'> Ravi Gupta </span></p> 
                </div>
            </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
                <div className="right text-center">
                    <div className="headColer fw-bold ">USEFULL LINKS</div>
                   <div className="line-parents mb-2 mt-1"> <div className="line"></div></div>
                    <a href="https://www.instagram.com/ravi_6upta/"><div className="text-color hov">Facebook</div></a>
                    <a href="https://www.instagram.com/ravi_6upta/"><div className="text-color hov">instagram</div></a>
                    <a href="https://www.instagram.com/ravi_6upta/"><div className="text-color hov">whatsapp</div></a>
                </div>
            </div>
            
        </div>
    </div>
</footer>

        
    </div>
    
  )
}

export default Footer