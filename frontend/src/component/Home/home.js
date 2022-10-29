import React, { Fragment, useEffect } from "react";
// import {IoMouse} from 'react-icons/all'
import "./home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../layout/Loader/loading";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);


  // window.addEventListener("contextmenu", (e)=>e.preventDefault());
  return (

    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment  >
          <MetaData title="MyCart E-commerce " />

          <div className="banner">
            <p>WELCOME TO MYCART</p>
            <h3>FIND AMAZING PRODUCT BELOW</h3>
            {/* <span>              
              <button onClick={()=>scroll()} id="hov">scroll</button>
            </span> */}
          </div>

      <div className="All">
          <div className="product-heading">
            <h4>PRODUCT FEATURES</h4>
            <div className="Line"></div>
          </div>
          <div className="Container p-2" id="Container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
      </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
