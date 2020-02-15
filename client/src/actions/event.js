import axios from "axios";
// import { setAlert } from "./alert";
import {
  GET_EVENTS,
  EVENT_ERROR,
  GET_EVENT,
  EVENT_APPROVAL,
  GET_VENDOR_EVENTS,
  CONFIRM_DATE
} from "./types";

// GET EVENTS
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events");

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};
export const getVendorEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events/vendor");

    setTimeout(() => {
      dispatch({
        type: GET_VENDOR_EVENTS,
        payload: res.data
      });
    }, 3000);
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// GET ONE EVENT
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const toggleApproval = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/status/${id}`);

    dispatch({
      type: EVENT_APPROVAL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};

export const confirmDate = (formData, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(`/api/events/date/${id}`, formData, config);
    console.log(res.data)
    dispatch({
      type: CONFIRM_DATE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.msg, status: err.response.status }
    });
  }
};
