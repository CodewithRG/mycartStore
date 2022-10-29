import React, { Fragment, useState, useEffect } from "react";
import "./forgetPassword.css";
import Loading from "../layout/Loader/loading";
// import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";


const ForgetPassword = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
  

  const { error, massage, loading } = useSelector((state) => state.forgetPassword);
console.log(massage)
  const [email, setEmail] = useState("");

  const forgetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email",email)
    dispatch(forgetPassword(myForm));

    console.log("form submit SignUp ");
  };

  useEffect(() => {
 
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    console.log(massage)
    if (massage) {
      alert.success(massage);
    }
  }, [dispatch, error, massage, alert]);


  return ( 
    <Fragment>
    {loading ? (
      <Loading />
    ) : (
      <Fragment>
        <div className="forgetPasswordContainer">
          <div className="forgetPasswordBox">
            <h1 id="forgetPassword">Forgot password</h1>

            <form
              className="forgetPasswordForm"
              encType="multipart/form-data"
              onSubmit={forgetPasswordSubmit}
            >
             

              <div className="forgetPasswordEmail">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

             

              <input
                type="submit"
                value="send"
                className="forgetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgetPassword