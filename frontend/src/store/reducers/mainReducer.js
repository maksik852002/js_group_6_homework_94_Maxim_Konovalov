import {OPEN_SUBSCRIBE_MODAL, CLOSE_SUBSCRIBE_MODAL} from "../actions/mainActions";

const initialState = {
  modalOpen: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SUBSCRIBE_MODAL:
      return {...state, modalOpen: true};
    case CLOSE_SUBSCRIBE_MODAL:
      return {...state, modalOpen: false};
    default:
      return state;
  }
};

export default mainReducer;