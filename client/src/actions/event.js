import axios from "axios";
import { setAlert } from "./alert";
import { GET_EVENTS, EVENT_ERROR } from "./types";

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
      // payload: { msg: res.statusText, status: err.response.status }
    });
  }
};
