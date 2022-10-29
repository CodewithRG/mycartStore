import React, { useState, Fragment } from 'react'
import { useNavigate} from "react-router-dom";
import MetaData from '../layout/MetaData';

import './search.css'


const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
    console.log("keyword:",keyword)

    navigate(`/products/${keyword}`)
        }
        else{
            navigate(`/products}`)

        }
    }

  return (
        <Fragment>
            <MetaData title="Search --MyCart" />
<form className='searchBox' onSubmit={searchSubmitHandler}>
        <input type="text" placeholder='Search a Product...' required  onChange={(e)=>setKeyword(e.target.value)} />
        <input type="submit" value="Search" />
</form>
        </Fragment>
  )
}

export default Search