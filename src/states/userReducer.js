const initialState = {
  user: null,
  userData: null,
};

const USERSUCCESS = "USERSUCCESS";
const USERDATASUCCESS = "USERDATASUCCESS";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERSUCCESS:
      return { ...state, user: action.payload };
    case USERDATASUCCESS:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const setUserAction = user => async (dispatch, getState) => {
  dispatch({
    type: USERSUCCESS,
    payload: user,
  });
};

export const setUserDataAction = userData => async (dispatch, getState) => {
  dispatch({
    type: USERDATASUCCESS,
    payload: userData,
  });
};
