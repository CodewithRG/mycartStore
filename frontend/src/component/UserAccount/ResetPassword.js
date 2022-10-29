import React, { Fragment, useState, useEffect } from "react";
import "./resetPassword.css";
import Loading from "../layout/Loader/loading";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const navigate = useNavigate();
    console.log("55ok...")
    const token = useParams();
  
    const { error, success, loading } = useSelector(state => state.forgetPassword);
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
      //  dispatch(resetPassword(name,email,password, avatar));
  
    //   console.log("form submit SignUp " );
    };
  
  
  
  
    useEffect(() => {
     
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }
      if (success) {
        alert.success("Password Updated Successfully..");
        dispatch(loadUser());
        navigate("/user");
  
      }
    }, [dispatch, error, alert, success, navigate]);
  
    return (
      <Fragment>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h1 id="resetPassword">Change Password</h1>
  
                <form
                  className="resetPasswordForm"
                  encType="multipart/form-data"
                  onSubmit={resetPasswordSubmit}
                >
                 
  
                  <div className="">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={password}
                      required
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
  
                  <div className="">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      
                      value={confirmPassword}
                      required
                      onChange={(e)=>setconfirmPassword(e.target.value)}
                    />
                  </div>
  
                  <input
                    type="submit"
                    value="Change"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
}


export default ResetPassword