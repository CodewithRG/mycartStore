import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import Loading from '../layout/Loader/loading'

const ProtectedRoute = (props) => {
    const {Component} = props;
    // console.log("Protected...")
    const Navigate = useNavigate();
    const {loading , isAuthenticated, user} = useSelector((state)=>state.user);
    useEffect(() => {
        
            if( loading === false ){
                if( isAuthenticated === false){
                Navigate("/user")
            }
            if(props.IsAdmin === true && user.role !== 'admin'  ){
                Navigate("/user")
            }
        }
            
         
    }, [isAuthenticated,loading]);
  return (


   <Fragment>
    
    {!loading && <Component />}
       
    
   </Fragment>
  )
}
 {/* {!loading && (
        <Route 
        {...rest}
        render={(props)=>{
            if(!isAuthenticated){
                return <Navigate to="/login" />
            }
            return <component {...props}/>

        }}

        />
    ) } */}
export default ProtectedRoute