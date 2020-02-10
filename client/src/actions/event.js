import axios from "axios";
import { setAlert } from "./alert";
import { GET_EVENTS, EVENT_ERROR, GET_EVENT } from "./types";

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
      type: EVENT_ERROR
      // payload: { msg: res.statusText, status: err.response.status }
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
      type: EVENT_ERROR
      // payload: { msg: res.statusText, status: err.response.status }
    });
  }
};
