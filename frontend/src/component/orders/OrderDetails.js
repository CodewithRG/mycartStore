import React, { useEffect, Fragment } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";

import { Typography } from "@material-ui/core";
import { getOrderDetails, clearError } from "../../actions/orderAction";
import Loading from "../layout/Loader/loading";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { orders, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error("error");
      dispatch(clearError());
    }

    dispatch(getOrderDetails(id));
  }, [error, dispatch, alert, id]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`Order Details`} />
          <div className="orderDetailPage">
            <div className="orderDetailContainer">
              <Typography component="h1">
                Order #{orders && orders._id}
              </Typography>
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
              <Typography>Payment</Typography>
              <div className="orderDetailContainerBox">
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
                <div>
                  <p>Amount</p>
                  <span>{orders.totalPrice && orders.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailContainerBox">
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

              <div className="orderDetailsCartItems">
                <Typography>Order Items: </Typography>

                <div className="orderDetailsCartItemsContainerBox">
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
