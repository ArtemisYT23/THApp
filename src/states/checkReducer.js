const initialState = {
  videoRef: null,
  videoRefERROR: null,
  markIndex: 0,
  markIndexERROR: null,
  hour: null,
  hourERROR: null,
  photo: null,
  photoERROR: null,
  coordinates: null,
  coordinatesERROR: null,
};

const VIDEOREFSUCCESS = "VIDEOREFSUCCESS";
const VIDEOREFERROR = "VIDEOREFERROR";
const MARKINDEXSUCCESS = "MARKINDEXSUCCESS";
const MARKINDEXERROR = "MARKINDEXERROR";
const HOURSUCCESS = "HOURSUCCESS";
const HOURERROR = "HOURERROR";
const PHOTOSUCCESS = "PHOTOSUCCESS";
const PHOTOERROR = "PHOTOERROR";
const COORDINATESSUCCESS = "COORDINATESSUCCESS";
const COORDINATESERROR = "COORDINATESERROR";

export const checkReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIDEOREFSUCCESS:
      return { ...state, videoRef: action.payload };
    case VIDEOREFERROR:
      return { ...state, videoRefERROR: action.payload };
    case MARKINDEXSUCCESS:
      return { ...state, markIndex: action.payload };
    case MARKINDEXERROR:
      return { ...state, markIndexERROR: action.payload };
    case HOURSUCCESS:
      return { ...state, hour: action.payload };
    case HOURERROR:
      return { ...state, hourERROR: action.payload };
    case PHOTOSUCCESS:
      return { ...state, photo: action.payload };
    case PHOTOERROR:
      return { ...state, photoERROR: action.payload };
    case COORDINATESSUCCESS:
      return { ...state, coordinates: action.payload };
    case COORDINATESERROR:
      return { ...state, coordinatesERROR: action.payload };
    default:
      return state;
  }
};

export const setVideoRefAction = videoRef => async (dispatch, getState) => {
  videoRef
    ? dispatch({
        type: VIDEOREFSUCCESS,
        payload: videoRef,
      })
    : dispatch({
        type: VIDEOREFERROR,
        payload: "NO SE PUDO ACTIVAR LA CÁMARA",
      });
};

export const setMarkIndexAction = index => async (dispatch, getState) => {
  index !== 0 || index
    ? dispatch({
        type: MARKINDEXSUCCESS,
        payload: index,
      })
    : dispatch({
        type: MARKINDEXERROR,
        payload: "NO SE PUDO ASIGNAR LA MARCACIÓN",
      });
};

export const setHourAction = hour => async (dispatch, getState) => {
  hour
    ? dispatch({ type: HOURSUCCESS, payload: hour })
    : dispatch({ type: HOURERROR, payload: "NO SE PUDO DEFINIR LA HORA" });
};

export const setPhotoAction = photo => async (dispatch, getState) => {
  photo
    ? dispatch({ type: PHOTOSUCCESS, payload: photo })
    : dispatch({ type: PHOTOERROR, payload: "NO SE PUDO PROCESAR LA FOTO" });
};

export const setCoordinatesAction =
  coordinates => async (dispatch, getState) => {
    coordinates
      ? dispatch({ type: COORDINATESSUCCESS, payload: coordinates })
      : dispatch({
          type: COORDINATESERROR,
          payload: "NO SE PUDO OBTENER LAS COORDENADAS",
        });
  };
