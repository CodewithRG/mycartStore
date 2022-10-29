import React, {useState} from 'react'
import './Header.css'
import Logo from '../../../images/mycartLogo.png'
import user from '../../../images/user.png'
import cart from '../../../images/carts.png'
import search from '../../../images/search.png'
import {Link} from 'react-router-dom'



const Header = () => {
    const [istrue, setIstrue] = useState(true);

  return ( 
    <div>
        <nav>
            <div className="mainNav" onClick={ ()=>{setIstrue(!istrue)} } >
                <div className={istrue ? "burgerItem" : "burgerItem rotateFirst"} id="burgerFirst"></div>
                <div className={istrue ? "burgerItem" : "burgerItem hide"} id="bugerSecond"></div>
                <div  className={istrue ? "burgerItem" : "burgerItem rotateThird"} id="burgerThird"></div>
            </div>
        </nav>
        {/* className="hide" */}
        <div id="mainDragDrop"  className={ istrue ? "hide " : "animate" }>
            <div className="mainDrag">
                <div className="">
                    <div className="logo "><img src={Logo} alt="logo" width={220} /></div>
                    <div className="links">
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="link"><Link to="/">HOME</Link></div>
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="link"><Link to="/products">PRODUCTS</Link></div>
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="link"><Link to="/about">ABOUT</Link></div>
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="link"><Link to="/contact">CONTACT</Link></div>

                    </div>
                    <div className="icons">
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="icon"><Link to="/user"><img src={user} alt="icon" width={30} /></Link></div>
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="icon"><Link to="/search"><img src={search} alt="icon" width={30} /></Link></div>
                        <div onClick={ ()=>{setIstrue(!istrue)} } className="icon"><Link to="/cart"><img src={cart} alt="icon" width={30} /></Link></div>
                    </div>
                </div>
            </div>
     </div>

    
    </div>

  )
}
 
export default Header