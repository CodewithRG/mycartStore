import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  CLEAR_ERROR,
} from "../constants/userConstant";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(`/api/v1/login`, { email, password }, config);
    // console.log(data.data.user )
    dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.massage });
  }
};

//register
export const register = (useData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(`/api/v1/register`, useData, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.data.user });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.get(`/api/v1/me`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.data.user });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: "User loading fail",
    });
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/loggout`);
    dispatch({ type: LOGOUT_SUCCESS });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.massage,
    });
  }
};

//Update profile
export const updateProfile = (useData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    // console.log("6+...",)
    const data = await axios.put(`/api/v1/profile/update`, useData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: "Update Fail",
    });
  }
};

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    console.log("7+...");
    const data = await axios.put(`/api/v1/password/update`, passwords, config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: "Update Fail",
    });
  }
};

//Forget Password
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(`/api/v1/password/forget`, email, config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.data.massage });
    // console.log(data.data.massage )
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.massage,
    });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  console.log(token);
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.put(
      `/api/v1/password/reset/${token.token}`,
      passwords,
      config
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.data.success });
    // console.log(data.data.massage )
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.massage,
    });
  }
};

// get All  users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({
      type: ALL_USER_SUCCESS,
      payload: data.users,
    });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.massage,
    });
  }
};

// get   users details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.massage,
    });
  }
};


// update user
export const updateUser = (id,userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.massage,
    });
  }
};

// delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
    // console.log(data.user)
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.massage,
    });
  }
};

// clearing error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
