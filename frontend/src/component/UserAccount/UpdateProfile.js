import React, { Fragment, useState, useEffect } from "react";
import "./updateProfile.css";
import Loading from "../layout/Loader/loading";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("/logo192.png");


  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
    //  dispatch(updateProfile(name,email,password, avatar));

    console.log("form submit SignUp "+avatar);
  };

  const updateProfileDataChange = (e) => {

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setavatarPreview(user.avtar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully..");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, user, navigate]);
  return (
 
        <Fragment>
          {loading ? (
            <Loading />
          ) : (
            <Fragment>
              <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h1 id="updateProfile">Profile Update</h1>

                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                  >
                    <div className="updateProfileName">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        required
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="updateProfileEmail">
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

                    <div id="updateProfileImg">
                      <img src={avatarPreview} alt="avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                    </div>

                    <input
                      type="submit"
                      value="Update"
                      className="updateProfileBtn"
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
    
  );
};

export default UpdateProfile;
