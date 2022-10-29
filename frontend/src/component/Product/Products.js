import React, { Fragment , useEffect,useState  } from 'react';
import './Products.css';
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction"; //clearError ,
// import ReactStars from "react-rating-stars-component";;
import Loading from '../layout/Loader/loading';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typographyphy from '@material-ui/core/Typography';
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'

const categories = [
  "Laptop",
  "Smart Phone",
  "Food",
  "Grocary",
  "Medicine",
  "Camera"
]

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert()

    const  [CurrentPage, setCurrentPage] = useState(1);
    const  [price, setprice] = useState([0,1200]);
    const [category, setCategory] = useState();
    const [ratings, setRatings] = useState(0);


    const { products, loading, error , productCount,resultPerPage,filterProductCount } = useSelector(
      (state) => state.products
    );
      const  { keyword }  = useParams(); 
      // console.log("error:",keyword)
    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearError())
      }
      dispatch(getProduct(keyword,CurrentPage,price, category,ratings));
    }, [dispatch,error,keyword,CurrentPage,price,category,ratings,alert]);


    // Functions
    const setCurrentPageNo = (e)=>{
      setCurrentPage(e)
    }

    const pricehandler = (event , newPrice)=>{
      setprice(newPrice)

    }

    let count  = filterProductCount;


  return (
    <div>
        <Fragment>
          <MetaData title="MyCart -- Products" />
          <div className='productsMainBox'>
          <div className='product-heading'><p>PRODUCTS</p></div>
            {
                loading ? <Loading/> : 
                  <Fragment>
                          <div className='products'>
                              {
                                  products && products.map((product)=>(

                                    <ProductCard key={product._id} product={product}/>
                                  )
                                  )
                              }
                          </div >
           
                          { count > resultPerPage && 
                          ( <div className="paginationBox">
                                  <Pagination 
                                  activePage={CurrentPage}
                                  itemsCountPerPage={resultPerPage}
                                  totalItemsCount={productCount}
                                  onChange={setCurrentPageNo}
                                  prevPageText="Prev"
                                  firstPageText="1st"
                                  lastPageText="Last"
                                  itemClass='page-item'
                                  linkClass='page-link'
                                  activeClass='pageItemActive'
                                  activeLinkClass='pageLinkActive'
                                  />
                              </div>) }
                                 
                          
                              <div className='filterBox'>
                            <Typographyphy>Price</Typographyphy>
                            <Slider 
                            value={price}
                            onChange={pricehandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={1200} />


                            <Typographyphy>Categories</Typographyphy>
                            <ul className='categoryBox'>
                              {
                                categories.map((categorye)=>(
                                  <li className='category-link'
                                  // key={category}
                                  value={categorye}
                                  onClick={(category)=>setCategory(categorye)}> 
                                   {categorye}
                                  </li>
                                ))
                              }
                             
                            </ul>        

                            <fieldset className='mt-1'>
                              <div className='legend'>Rating Above</div>
                              <Slider 
                              value={ratings}
                                onChange={(e,newRating)=>{
                                  setRatings(newRating)
                                }}  
                               aria-labelledby="continous-slider"
                              valueLabelDisplay="auto"

                               min={0}
                               max={5}

                              />
                              </fieldset>                      
                          </div>


                              
                           

                </Fragment>
            }
              </div>
        </Fragment>

        

    </div>
  )
}

export default Products

      