import React,{Fragment, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './Adminproducts.css'
import { useSelector,  useDispatch} from 'react-redux'
import {clearError, deleteProduct, getAdminProducts} from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productContants'

const AdminProducts = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  // const id = useParams();
  const Navigate = useNavigate();

  const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id))

  }

  const {error , products} = useSelector((state)=>state.products)
  const {error:deleteError, isDeleted} = useSelector((state) => state.deleteProduct)

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth:200, flex:0.5},

    {
      field: 'name', 
      headerName: 'Name', 
      minWidth:350, 
      flex:1,
   },
   {
    field: 'stock', 
    headerName: 'Stock', 
    type: "number",
    minWidth:150, 
    flex:0.3,
 },
 {
  field: 'price', 
  headerName: 'Price', 
  type: "number",
  minWidth:270, 
  flex:0.5,
},
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
      <Link to={`/admin/product/update/${params.getValue(params.id, "id")}`} >
      <EditIcon/>
      </Link>

      <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))} >
        <DeleteIcon/>
      </Button>
      </Fragment>
    );

    
  },
},
  ] ;


  const rows = [];

  products && products.forEach((item)=>{
    rows.push({
      id:item._id,
      stock: item.stock,
      price: item.price,
      name: item.name,
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
      alert.success("Product Deleted Successfully");
      Navigate("/admin/dashboard")
      dispatch({type:DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProducts());

  }, [alert, dispatch , error,deleteError, isDeleted,Navigate]);

  return (
    <Fragment>
      <MetaData title={`All Products-- Admin`} />
      <div
      className='dashboard'>
      <Sidebar />

      <div className='adminProductContainer'>
        <h1 className='adminProductHeading'>ALL PRODUCTS</h1>

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

export default AdminProducts