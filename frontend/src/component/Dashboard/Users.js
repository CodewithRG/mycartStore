import React,{Fragment, useEffect} from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './Adminproducts.css'
import { useSelector,  useDispatch} from 'react-redux'

import {clearError,deleteUser,getAllUsers} from '../../actions/userAction'

import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productContants'
import { DELETE_USER_RESET } from '../../constants/userConstant'

const UserList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  // const id = useParams();
  const Navigate = useNavigate();

  const deleteUserHandler = (id)=>{
    dispatch(deleteUser(id))

  }

  const {error , users} = useSelector((state)=>state.allUsers)
  const {error:deleteError, isDeleted} = useSelector((state) => state.profile)

  const columns = [
    { field: 'id', headerName: 'USER ID', minWidth:200, flex:0.6},

    {
      field: 'email', 
      headerName: 'Email', 
      minWidth:200, 
      flex:0.6,
   },
   {
    field: 'name', 
    headerName: 'Name', 
    minWidth:200, 
    flex:0.6,
 },
 {
  field: 'role', 
  headerName: 'Role', 
  minWidth:100, 
  flex:0.3,
  cellClassName: (params)=>{
    return(
      params.getValue(params.id, "role") === "admin" ? "greenColor" : "yellowColor"
    )
  } 
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
      <Link to={`/admin/user/update/${params.getValue(params.id, "id")}`} >
      <EditIcon/>
      </Link>

      <Button onClick={()=>deleteUserHandler(params.getValue(params.id, "id"))} >
        <DeleteIcon/>
      </Button>
      </Fragment>
    );

    
  },
},
  ] ;


  const rows = [];

  users && users.forEach((item)=>{
    rows.push({
      id:item._id,
      name: item.name,
      role: item.role,
      email: item.email,
    })
  })

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearError())
    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearError())
    }
    if(isDeleted){
      alert.success("User deleted succesfully")
      Navigate("/admin/users")
      dispatch({type:DELETE_USER_RESET})
    }
    dispatch(getAllUsers());

  }, [alert, dispatch , error, deleteError, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`All USERS-- Admin`} />
      <div
      className='dashboard'>
      <Sidebar />

      <div className='adminProductContainer'>
        <h1 className='adminProductHeading'>ALL USERS</h1>

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

export default UserList