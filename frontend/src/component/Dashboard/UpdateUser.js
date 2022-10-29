import React,{Fragment, useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './NewProduct.css'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import StorageIcon from "@material-ui/icons/Storage"
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET  } from '../../constants/productContants'
import { useNavigate, useParams } from 'react-router-dom'
import {clearError, getUserDetails, updateUser } from '../../actions/userAction'
import { UPDATE_USER_RESET } from '../../constants/userConstant'
import Loading from '../layout/Loader/loading'



const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {id} = useParams();
    const navigate = useNavigate();

    const {loading:updateLoading, error:updateError, isUpdated} = useSelector((state)=>state.profile)
    const {loading, error,user} = useSelector((state)=>state.userDetails)

    const [name, setname] = useState("");
    const [role, setrole] = useState("");
    const [email, setEmail] = useState("")

    const userUpdateHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("role",role)
        myForm.set("email", email)
      

     
        dispatch(updateUser(id,myForm));
    }

    
  
    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id))
          } else {
            setname(user.name);
            setrole(user.role);
            setEmail(user.email);
         
          }
     if(error){
        alert.error(error)
        dispatch(clearError())
     }
     if(updateError){
        alert.error(updateError)
        dispatch(clearError())
     }
     if(isUpdated){
        alert.success("Update User Successfully");
        navigate("/admin/users");
        dispatch({type: UPDATE_USER_RESET})
     }
    }, [dispatch, error, alert, isUpdated,updateError,id,navigate,user]);



  return (
   <Fragment>
    <MetaData  title={`Create Product`} />
   {loading ? <Loading/> :(
     <div className='dashboard'>
     <Sidebar/>
     <div className='newProductContainer'>
         <form 
         className='newProductForm'
         encType='multipart/form-data'
         onSubmit={userUpdateHandler}
         >
             <h1>UPDATE USER</h1>

             <div>
                 <SpellcheckIcon/>
                 <input type="text"
                         placeholder='Name'
                         required
                         value={name} 
                         onChange={(e)=>setname(e.target.value)}
                 />
             </div>
             <div>
                 <StorageIcon/>
                 <input type="text"
                         placeholder='Email'
                         required
                         value={email}
                         onChange={(e)=>setEmail(e.target.value)}
                 />
             </div>
        
         
           

             <div>
                 <AccountTreeIcon/>
                 <select value={role}  onChange={(e)=>setrole(e.target.value)}>

                     <option value="" > Choose Role</option>
                     <option value="user"> User</option>
                     <option value="admin">admin</option>
                   
                 </select>
             </div>

            
            
             
            

             <Button id='createProductBtn' type="submit" disabled={updateLoading?true:false || role===""?true:false} >
                 
                 Update
             </Button>

         </form>

     </div>

 </div>
   )}
   </Fragment>
  )
}


export default UpdateUser