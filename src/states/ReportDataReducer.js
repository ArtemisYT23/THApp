import { apiFrontendExtends } from "../config/axios";
import axios from "axios";

const inititalState = {
    ReportToday: [],
    ReportToday1: [],
    UnionBusinness: [],
    selectedPerson: [],
    loadingData: false,
    openDetail: false,
}

const GET_ALL_REPORT_PERSONS = "GET_ALL_REPORT_PERSONS";
const GET_ALL_REPORT_PERSONS_ERRORS = "GET_ALL_REPORT_PERSONS_ERRORS";
const SET_ACTIVE_SPINNER = "SET_ACTIVE_SPINNER";
const SET_OPEN_MODAL_DETAILS = "SET_OPEN_MODAL_DETAILS";
const CLEAR_STATE_REPORT = "CLEAR_STATE_REPORT";
const SELECTED_PERSON_INFO = "SELECTED_PERSON_INFO";
const GET_ALL_REPORT_PERSONS_BUSINESS = "GET_ALL_REPORT_PERSONS_BUSINESS";
const GET_ALL_REPORT_PERSONS_BUSINESS_ERRORS = "GET_ALL_REPORT_PERSONS_BUSINESS_ERRORS";
const SET_UNION_BUSINESS_DATA = "SET_UNION_BUSINESS_DATA";

export default function ReportReducer(state = inititalState, action) {
    switch (action.type) {
        case GET_ALL_REPORT_PERSONS:
        case GET_ALL_REPORT_PERSONS_ERRORS:
        case SET_ACTIVE_SPINNER:
        case SET_OPEN_MODAL_DETAILS:
        case CLEAR_STATE_REPORT:
        case SELECTED_PERSON_INFO:
        case GET_ALL_REPORT_PERSONS_BUSINESS:
        case GET_ALL_REPORT_PERSONS_BUSINESS_ERRORS:
        case SET_UNION_BUSINESS_DATA:
            return action.payload;
        default:
            return state;
    }
}

//traer todos los datos empresa 1
export const getAllDataReport = (businessId, report) => async (dispatch, getState) => {
    const { reportState } = getState();
    // dispatch(setActiveSpinnerReport(true));
    axios({
        url: `${apiFrontendExtends}Report/Generator?BusinessId=${businessId[0]?.id}`,
        method: "POST",
        data: report,
        headers: {
            "Accept": "application/json"
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_REPORT_PERSONS,
                payload: { ...reportState, ReportToday: response.data }
            })
            dispatch(getAllDataReportBusinness(businessId[1]?.id, report));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_REPORT_PERSONS_ERRORS,
            payload: { ...reportState, ReportToday: [] }
        })
        //dispatch(setActiveSpinnerReport(false));
    })
}


//Traer todos los datos empresa 2
export const getAllDataReportBusinness = (businessId, report) => async (dispatch, getState) => {
    const { reportState } = getState();
    dispatch(setActiveSpinnerReport(true));
    axios({
        url: `${apiFrontendExtends}Report/Generator?BusinessId=${businessId}`,
        method: "POST",
        data: report,
        headers: {
            "Accept": "application/json"
        }
    }).then(function (response) {
        if (response.status == 200) {
            dispatch({
                type: GET_ALL_REPORT_PERSONS_BUSINESS,
                payload: { ...reportState, ReportToday1: response.data }
            })
            dispatch(setActiveSpinnerReport(false));
        }
    }).catch(function (error) {
        console.log(error);
        dispatch({
            type: GET_ALL_REPORT_PERSONS_BUSINESS_ERRORS,
            payload: { ...reportState, ReportToday1: [] }
        })
        dispatch(setActiveSpinnerReport(false));
    })
}

//filtrar persona por id para traer su ubicacion
export const setSelectedPersonInfo = (index) => async (dispatch, getState) => {
    const { reportState } = getState();
    const { UnionBusinness } = reportState;
    const selectedPerson = UnionBusinness.filter((report) => report.id === index);

    dispatch({
        type: SELECTED_PERSON_INFO,
        payload: { ...reportState, selectedPerson },
    });
}

//Guardar Union de datos de empresas
export const setDataUnionBusinness = (data) => async (dispatch, getState) => {
    const { reportState } = getState();
    dispatch({
        type: SET_UNION_BUSINESS_DATA,
        payload: { ...reportState, UnionBusinness: data }
    })
}

//Estado de carga del spinner
export const setActiveSpinnerReport = (bool) => async (dispatch, getState) => {
    const { reportState } = getState();
    dispatch({
        type: SET_ACTIVE_SPINNER,
        payload: { ...reportState, loadingData: bool }
    })
}

//Estado de apertura de modal de detalle por registro
export const setOpenModalDetails = (bool) => async (dispatch, getState) => {
    const { reportState } = getState();
    dispatch({
        type: SET_OPEN_MODAL_DETAILS,
        payload: { ...reportState, openDetail: bool }
    })
}

//limpiar estado de reporte
export const clearStateReport = () => async (dispatch, getState) => {
    const { reportState } = getState();
    dispatch({
        type: CLEAR_STATE_REPORT,
        payload: { ...reportState, ReportToday: [], ReportToday1: [], UnionBusinness: [] }
    })
}