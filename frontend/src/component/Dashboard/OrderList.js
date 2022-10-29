import React,{Fragment, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import { useSelector,  useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from './Sidebar'
import { allOrders, deleteOrder,clearError } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'

const OrderList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  // const id = useParams();
  const Navigate = useNavigate();

  const deleteOrderHandler = (id)=>{
    dispatch(deleteOrder(id))

  }

  const {error , orders} = useSelector((state)=>state.allOrders)
  const {error:deleteError, isDeleted} = useSelector((state) => state.order)

  const columns = [
    { field: "id", headerName: "Order ID", minwidth: 300, flex: 1 },
    { field: "status", headerName: "Status", minwidth: 150, flex: 0.5, cellClassName: (params)=>{
      return(
        params.getValue(params.id, "status") === "Processing" ? "yellowColor" : "greenColor"
      )
    } },
    { field: "itemsQty", headerName: "Item Qty", minwidth: 150, type: "number",flex: 0.3 },
    { field: "amount", headerName: "Amount", minwidth: 270, type: "number",flex: 0.5 },
{
  field: 'actions', 
  headerName: 'Actions', 
  type: "number",
  minWidth:150, 
  flex:0.3,
  sortable:false,
  renderCell: (params)=>{
    return (
      <Fragment>
      <Link to={`/admin/orders/update/${params.getValue(params.id, "id")}`} >
      <EditIcon/>
      </Link>

      <Button onClick={()=>deleteOrderHandler(params.getValue(params.id, "id"))} >
        <DeleteIcon/>
      </Button>
      </Fragment>
    );

    
  },
},
  ] ;


  const rows = [];

  orders && orders.forEach((item)=>{
    rows.push({
      id:item._id,
      status: item.orderStatus,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice, 
    })
  })

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearError());
    }
    if(isDeleted){
      alert.success("Order Deleted Successfully");
      Navigate("/admin/dashboard")
      dispatch({type:DELETE_ORDER_RESET});
    }
    dispatch(allOrders());

  }, [alert, dispatch,isDeleted ,deleteError, error,Navigate]);

  return (
    <Fragment>
      <MetaData title={`All Orders-- Admin`} />
      <div
      className='dashboard'>
      <Sidebar />

      <div className='adminProductContainer'>
        <h1 className='adminProductHeading'>ALL ORDERS</h1>

        <DataGrid 
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className='adminProductTable'
          autoHeight
        />

      </div>

      </div>

    </Fragment>
  )
}

export default OrderList