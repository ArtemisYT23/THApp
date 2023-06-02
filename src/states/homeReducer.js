const initialState = {
  isMenuOpen: false,
  isCheckDay: true,
};

const ISMENUOPENSUCCESS = "ISMENUOPENSUCCESS";
const ISCHECKDAY = "ISCHECKDAY";

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISMENUOPENSUCCESS:
      return { ...state, isMenuOpen: action.payload };
    case ISCHECKDAY:
      return { ...state, isCheckDay: action.payload };
    default:
      return state;
  }
};

export const setIsMenuOpenAction = is => async (dispatch, getState) => {
  dispatch({
    type: ISMENUOPENSUCCESS,
    payload: is,
  });
};

export const setIsCheckDayAction = is => async (dispatch, getState) => {
  dispatch({
    type: ISCHECKDAY,
    payload: is,
  });
};
