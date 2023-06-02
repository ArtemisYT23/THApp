const initialState = {
  employee: null,
};

const EMPLOYEESUCCES = "EMPLOYEESUCCES";

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEESUCCES:
      return { ...state, employee: action.payload };
    default:
      return state;
  }
};

export const setEmployeeAction = employee => async (dispatch, getState) => {
  dispatch({
    type: EMPLOYEESUCCES,
    payload: employee,
  });
};
