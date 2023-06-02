const initialState = {
  entityName: null,
  isMenuOpen: false,
  businesses: [],
  roles: [],
  business: {},
  rol: {},
  users: [],
  user: {},
  usersData: [],
  userData: {},
  filter: "",
};

const ENTITYNAMESUCCESS = "ENTITYNAMESUCCESS";
const ISMENUOPENSUCCESS = "ISMENUOPENSUCCESS";
const BUSINESSESSUCCESS = "BUSINESSESSUCCESS";
const BUSINESSSUCCESS = "BUSINESSSUCCESS";
const ROLESSUCCESS = "ROLESSUCCESS";
const ROLSUCCESS = "ROLSUCCESS";
const USERSSUCCESS = "USERSSUCCESS";
const USERSUCCESS = "USERSUCCESS";
const USERSDATASUCCESS = "USERSDATASUCCESS";
const USERDATASUCCESS = "USERDATASUCCESS";
const FILTERSUCCESS = "FILTERSUCCESS";

export const saReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENTITYNAMESUCCESS:
      return { ...state, entityName: action.payload };
    case ISMENUOPENSUCCESS:
      return { ...state, isMenuOpen: action.payload };
    case BUSINESSESSUCCESS:
      return { ...state, businesses: action.payload };
    case BUSINESSSUCCESS:
      return { ...state, business: action.payload };
    case ROLESSUCCESS:
      return { ...state, roles: action.payload };
    case ROLSUCCESS:
      return { ...state, rol: action.payload };
    case USERSSUCCESS:
      return { ...state, users: action.payload };
    case USERSDATASUCCESS:
      return { ...state, usersData: action.payload };
    case USERSUCCESS:
      return { ...state, user: action.payload };
    case USERDATASUCCESS:
      return { ...state, userData: action.payload };
    case FILTERSUCCESS:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export const setEntityNameAction = name => async (dispatch, getState) => {
  dispatch({
    type: ENTITYNAMESUCCESS,
    payload: name,
  });
};

export const setIsMenuOpenAction = is => async (dispatch, getState) => {
  dispatch({
    type: ISMENUOPENSUCCESS,
    payload: is,
  });
};

export const setBusinessesAction = businesses => async (dispatch, getState) => {
  dispatch({
    type: BUSINESSESSUCCESS,
    payload: businesses,
  });
};

export const setBusinessAction = businessId => async (dispatch, getState) => {
  const { businesses } = getState().sa;
  const business = businesses.find(b => b.id === businessId);
  dispatch({
    type: BUSINESSSUCCESS,
    payload: business,
  });
};

export const setRolesAction = roles => async (dispatch, getState) => {
  dispatch({
    type: ROLESSUCCESS,
    payload: roles,
  });
};

export const setRolAction = rolId => async (dispatch, getState) => {
  const { roles } = getState().sa;
  const rol = roles.find(r => r.id === rolId);
  dispatch({
    type: ROLSUCCESS,
    payload: rol,
  });
};

export const setUsersAction = users => async (dispatch, getState) => {
  dispatch({
    type: USERSSUCCESS,
    payload: users,
  });
};

export const setUsersDataAction = usersData => async (dispatch, getState) => {
  dispatch({
    type: USERSDATASUCCESS,
    payload: usersData,
  });
};

export const setUserAction = userId => async (dispatch, getState) => {
  const { users, usersData } = getState().sa;
  const user = users.find(u => u.id === userId);
  const userData = usersData.find(u => u.id === userId);

  dispatch({
    type: USERSUCCESS,
    payload: user,
  });

  dispatch({
    type: USERDATASUCCESS,
    payload: userData,
  });
};

export const setFilterAction = filter => async (dispatch, getState) => {
  dispatch({
    type: FILTERSUCCESS,
    payload: filter,
  });
};
