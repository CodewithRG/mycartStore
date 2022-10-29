import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../component/layout/MetaData'
import Loading from '../layout/Loader/loading'
import './profile.css'


const Profile = () => {
    const {user, loading} = useSelector(state=>state.user)
  return (
   <Fragment>
    { loading?( <Loading/>):
         (<Fragment>
         <MetaData title={`${user.name}`} />
      
         <div className='profileContainer'>
             <div>
                 <h1>MY PROFILE</h1>
                 <img src={user.avtar.url} alt="profile" />
                 <Link to="/profile/update" >Edit Profile</Link>
             </div>
             <div>
                 <div>
                     <h4>Full Name</h4>
                     <p>{user.name}</p>
                 </div>
                 <div>
                     <h4>Email</h4>
                     <p>{user.email}</p>
                 </div>
                 <div>
                     <h4>Joined On</h4>
                     <p>{String(user.createAt).substr(0, 10)}</p>
                 </div>
      
             <div>
                 <Link to="/orders/me">My Order</Link>
                 <Link to="/password/update">Change Password</Link>
      
             </div>
      
             </div>
         </div>
      </Fragment> )
   
  
}
   </Fragment>
    )
}

export default Profile