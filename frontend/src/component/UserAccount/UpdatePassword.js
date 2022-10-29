import React, { Fragment, useState, useEffect } from "react";
import "./updatePassword.css";
import Loading from "../layout/Loader/loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector(state => state.profile);

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
    //  dispatch(updatePassword(name,email,password, avatar));

    console.log("form submit SignUp " );
  };




  useEffect(() => {
   
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Password Changed Successfully..");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h1 id="updatePassword">Change Password</h1>

              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="oldPassword">
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="password"
                    value={oldPassword}
                    required
                    onChange={(e)=>setoldPassword(e.target.value)}
                  />
                </div>

                <div className="newPassword">
                  <input
                    type=" password"
                    placeholder="New Password"
                    name="newpassword"
                    value={newPassword}
                    required
                    onChange={(e)=>setnewPassword(e.target.value)}
                  />
                </div>

                <div className="confirmPassword">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password"
                    value={confirmPassword}
                    required
                    onChange={(e)=>setconfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
