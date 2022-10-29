import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, myOrders } from "../../actions/orderAction";
import Loading from "../layout/Loader/loading";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import LunchIcon from "@material-ui/icons/Launch";
// import { red } from "@material-ui/core/colors";

const MyOrderss = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minwidth: 300, flex: 1 },
    { field: "status", headerName: "Status", minwidth: 150, flex: 0.5, cellClassName: (params)=>{
      return(
        params.getValue(params.id, "status") === "Processing" ? "yellowColor" : "greenColor"
      )
    } },
    { field: "itemsQty", headerName: "Item Qty", minwidth: 150, type: "number",flex: 0.3 },
    { field: "amount", headerName: "Amount", minwidth: 270, type: "number",flex: 0.5 },
    
    { field: "action", headerName: "Actions", minwidth: 150, type: "number",flex: 0.3, sortable:false,
    renderCell: (params) =>{
        return(
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
          <LunchIcon/>
          </Link>
        )
    }
  },


  ];
  let rows = [];

 if(orders)
 {  orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      })
    });
}

  useEffect(() => {
    if(error){
      alert.error("error")
      dispatch(clearError())
    }

    dispatch(myOrders())
   
  }, [error,dispatch,alert]);
  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
              // autoWidth
            />
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrderss;
