import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./Cart/CheckoutSteps.js";
import { Link,  useNavigate } from "react-router-dom";
import "./shippingCinfirm.css";

const ShippingConfirm = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
    const Navigate = useNavigate()
    
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}, `

    const subTotal = cartItems.reduce(
        (acc, item)=> acc + item.price * item.quantity, 0
    )
    const shippingCharges = subTotal > 1000 ? 0 : 60;
    const Tax = subTotal * 0.18;
    const totalPrice = subTotal + Tax + shippingCharges;

    const proceedToPayment = ()=>{
        const data = {
            subTotal,shippingCharges,Tax,totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        Navigate("process/payment");
    }
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItem">
            <Typography>Confirm Cart Item</Typography>

            <div className="confirmCartItemContainer">
              {cartItems &&
                cartItems.map((item) => (
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
        <div>
          <div className="orderSummery">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs {subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs {shippingCharges}</span>
              </div>
              <div>
                <p>GST : </p>
                <span>Rs {Tax}</span>
              </div>
            </div>

            <div className="orderSummeryTotal">
              <p>
                <b>Total :</b>
              </p>
              <span>Rs {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShippingConfirm;
