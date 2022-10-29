import React, { Fragment, useEffect } from "react";
import './UpdateOrder.css'
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
// import CheckoutSteps from "./Cart/CheckoutSteps.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getOrderDetails, clearError, updateOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loading from "../layout/Loader/loading";
import  AccountTreeIcon from '@material-ui/icons/AccountTree'
import {Button} from "@material-ui/core";
import { useState } from "react";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";

const UpdateOrder = () => {
  const { orders, error, loading } = useSelector((state) => state.orderDetails);
  const {  error:UpdateError, isUpdated } = useSelector((state) => state.order);

  const Navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error("error");
      dispatch(clearError());
    }
 if (UpdateError) {
      alert.error("Update Order error");
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      Navigate("/admin/orders");
      dispatch({type:UPDATE_ORDER_RESET});
    }

    dispatch(getOrderDetails(id));

  }, [error, dispatch, alert, id,isUpdated,UpdateError,Navigate]);


  const ProccessOrder = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
  
    dispatch(updateOrder(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title={`Proccess Order`} />
      <div className="dashboard">
        <Sidebar />
        {loading ? <Loading/> : (

          <div className="newProductContainer"
          style={
            {display: orders.orderStatus === "Delivered" ? "block" : "grid"}
          }
          >
          <div className="confirmOrderPage"
          style={
            {display: orders.orderStatus === "Delivered" ? "block" : "grid"}
          }
          >
            <div>
              <div className="confirmShippingArea">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailContainerBox">
                  <div>
                    <p>Name : </p>
                    <span> {orders.users && orders.users.name}</span>
                  </div>
                  <div>
                    <p>Phone : </p>
                    <span>
                      {" "}
                      {orders.shippingInfo && orders.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address : </p>
                    <span>
                      {" "}
                      {orders.shippingInfo &&
                        `${orders.shippingInfo.address}, ${orders.shippingInfo.city}, ${orders.shippingInfo.state}, ${orders.shippingInfo.country}, ${orders.shippingInfo.pincode}`}{" "}
                    </span>
                 
                  </div>
                </div>
              </div>

              <div className="orderDetailContainerBoxPayment">
              <Typography>Payment</Typography>
                <div>
                  <p
                    className={
                      orders.paymentInfo &&
                      orders.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "YellowColor"
                    }
                  >
                    {orders.paymentInfo &&
                    orders.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div className="Amount">
                  <p>Amount : </p>
                  <span> { orders.totalPrice && orders.totalPrice }</span>
                </div>
              </div>

              <div className="orderDetailContainerBoxStatus">
              <Typography>Order Status</Typography>
                <div>
                  <p
                    className={
                      orders.orderStatus && orders.orderStatus !== "Processing"
                        ? "greenColor"
                        : "yellowColor"
                    }
                  >
                    {orders.orderStatus && orders.orderStatus}
                  </p>
                </div>
              </div>

              <div className="confirmCartItem">
                <Typography>Confirm Cart Item</Typography>
                <div className="confirmCartItemContainer">
                  {orders.orderItems &&
                    orders.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X Rs {item.price}={" "}
                          <b>Rs {item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* next */}
            <div 
              style={
                {display: orders.orderStatus === "Delivered" ? "none" : "block"}
              }
            >

            <form
            className="orderProccessForm"
            encType="multipart/form-data"
            onSubmit={ProccessOrder}
          >
            <h1>Process Order</h1>
            <div>
              <AccountTreeIcon />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value=""> Choose Category</option>
                {orders.orderStatus === "Processing" && <option value="Shipped"> Shipped</option>}
                {orders.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                
               
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false || status === "" ? true : false}
            >
              Update
            </Button>
          </form>

            </div>
          </div>
          {/* {console.log("okey..")} */}
        </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateOrder;
