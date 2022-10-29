import React, { Fragment, useRef,useState, useEffect} from 'react'
import './user.css';
import Loading from '../layout/Loader/loading';
import {Link , useNavigate, useLocation} from 'react-router-dom'

import {useDispatch,useSelector} from 'react-redux';
import { clearError, login, register } from '../../actions/userAction'

import { useAlert } from 'react-alert'

const User = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation()
  const navigate = useNavigate();

  const {error, loading, isAuthenticated} = useSelector(state => state.user);

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  
  // const [SignUpName, setSignUpName] = useState("");
  // const [SignUpEmail, setSignUpEmail] = useState("");
  // const [SignUpPassword, setSignUpPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email:"",
    password:"", 
  });
const {name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("/logo192.png");

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTab = useRef(null);

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if(error){
   alert.error(error);
   dispatch(clearError())
    }
    if(isAuthenticated){
      navigate(redirect); 
    }
  }, [dispatch,error,alert,isAuthenticated,navigate,redirect]);

  const switchTabs = (e, tab)=>{
    if(tab === "login"){
      switchTab.current.classList.add("shiftToNatural")
      switchTab.current.classList.remove("shiftToRight")

      registerTab.current.classList.remove("shiftToNaturalForm")
      loginTab.current.classList.remove("shiftToLeft")
    }
    if (tab === "register"){
      switchTab.current.classList.add("shiftToRight")
      switchTab.current.classList.remove("shiftToNatural")

      registerTab.current.classList.add("shiftToNaturalForm")
      loginTab.current.classList.add("shiftToLeft")

    }
  }
const registerDataChange = (e)=>{
    if(e.target.name === "avatar"){
      const reader = new FileReader();
      reader.onload = ()=>{
        if(reader.readyState === 2){
          setavatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0])
    }else{
      setUser({...user , [e.target.name]: e.target.value})
    }
};


  const loginSubmit = (e)=>{
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))
    // console.log("form submit"+loginEmail+loginPassword);
  }

const registerSubmit = (e)=>{
e.preventDefault();

const myForm = new FormData();
 myForm.set("name",name)
 myForm.set("email",email)
 myForm.set("password",password)
 myForm.set("avatar", avatar)

 dispatch(register(myForm));
//  dispatch(register(name,email,password, avatar));

  console.log("form submit SignUp "+avatar)
}
  return (
   <Fragment>
    {loading?<Loading /> :  <Fragment>

<div className='userContainer'>
  <div className='loginSignUpBox'>
    <div>
      <div className='loginSignUpToggle'>
        <p onClick={(e)=>switchTabs(e,"login")}>Login</p>
        <p onClick={(e)=>switchTabs(e,"register")} >Register</p>
      </div>
      <button ref={switchTab}></button>
    </div>
    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
      <div className='loginEmail'>
        <input type="email" placeholder='Email' required value={loginEmail}  onChange={(e)=>setloginEmail(e.target.value)}/>
      </div>
      <div className='loginpassword'>
        <input type="password" placeholder='Password' required value={loginPassword}  onChange={(e)=>setloginPassword(e.target.value)}/>
      </div>
      <Link to="/password/forget">Forget Password ?</Link>
      <input type="submit" value="Login" className='loginBtn' />

    </form>
{/* register */}

    <form className='signUpForm' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>

      <div className='signUpName'  >
        <input type="text" placeholder='Name' name='name' value={name} required onChange={registerDataChange}/>

      </div>

      <div className='signUpEmail'>
      <input type="email" placeholder='Email' name='email' value={email} required onChange={registerDataChange} />

      </div>
      <div className='signUpPassword'>
      <input type="password" placeholder='Password' name='password' value={password} required onChange={registerDataChange}/>

      </div>
      <div id='registerImg'>
          <img src={avatarPreview} alt="avatar Preview" />
          <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
      </div>
      <input type="submit" value="Register" className="signUpBtn" />
    </form>
  </div>
</div>
</Fragment>}
   </Fragment>
  )
}

export default User