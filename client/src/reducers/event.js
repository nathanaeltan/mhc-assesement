import {
  GET_EVENTS,
  EVENT_ERROR,
  GET_EVENT,
  EVENT_APPROVAL,
  GET_VENDOR_EVENTS,
  CONFIRM_DATE
} from "../actions/types";

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
    case GET_VENDOR_EVENTS:
    case EVENT_APPROVAL:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CONFIRM_DATE:
      return {
        ...state,
        event: { ...state.event, confirmed_date: payload },
        loading: false
      };
    default:
      return state;
  }
}
