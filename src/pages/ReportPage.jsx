import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingApp from "../components/LoadingApp";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AreaGetAll, DepartamentGetAll } from "../functions/axiosRequest";
import { AgGridReact } from "ag-grid-react";
import {
  getAllDataReport,
  setSelectedPersonInfo,
  setOpenModalDetails,
  clearStateReport,
  setDataUnionBusinness,
} from "../states/ReportDataReducer";
import { ModalDetail } from "../components/ModalDetail";

import "./css/report.css";
const ReportPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { reportState } = useSelector((store) => store);
  const { ReportToday, ReportToday1, loadingData } = reportState;

  const now = new Date()
    .toISOString()
    .substring(0, new Date().toISOString().indexOf("T"));

  const [fromDate, setFromDate] = useState(now);
  const [toDate, setToDate] = useState(now);
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState(null);
  const [departaments, setDepartaments] = useState([]);
  const [business, setBusiness] = useState([
    {
      id: "9aa75e2c-7258-4315-8e62-92bfc0c4c01b",
      name: "COMEXPORT S.A.",
    },
    {
      id: "33a72cf9-e989-4e3b-9f7e-388e2dcae266",
      name: "CENTRALFILE S.A.",
    },
  ]);
  const [departamentId, setDepartamentId] = useState(null);
  const [gridApi, setGridApi] = useState({});
  const [dataGridView, setDataGridView] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [ActiveFilter, setActiveFilter] = useState(true);
  const [dataView, setDataView] = useState([]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      minWidth: 140,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  const pagination = true;
  const paginationPageSize = 300;

  //si no esta logeado lo manda al login
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, []);

  const ChildMessageRenderer = (props) => {
    const invokeParentMethod = () => {
      // console.log(props.node.data);
      dispatch(setOpenModalDetails(true));
      dispatch(setSelectedPersonInfo(props.node.data.idPerson));
    };

    return (
      <button className="ButtonDetail" onClick={invokeParentMethod}>
        Detalle
      </button>
    );
  };

  useEffect(() => {
    if (user) {
      AreaGetAll(user.businessId).then((res) => setAreas(res.data));
      DepartamentGetAll(user.businessId).then((res) =>
        setDepartaments(res.data)
      );
    }
  }, []);

  useEffect(() => {
    const dataNew = ReportToday.concat(ReportToday1);
    setDataView(dataNew);
    dispatch(setDataUnionBusinness(dataNew));
  }, [ReportToday1]);

  useEffect(() => {
    const newReport = [];
    dataView.map((report) => {
      const obj = {
        id: report.idCard,
        idPerson: report.id,
        typeMark: report.markName,
        hour: report.hour.slice(0, 5),
        name: report.name + " " + report.surName,
        checkDate: report.checkDate.slice(0, 10),
        departamentName: report.departamentName,
        businessName: report.businessName,
      };
      newReport.push(obj);
    });

    // console.log(newReport);

    const nuevoObjeto = newReport.reduce((acumulador, objeto) => {
      const encontrado = acumulador.find(
        (item) => item.id === objeto.id && item.checkDate === objeto.checkDate
      );
      if (!encontrado) {
        acumulador.push({
          id: objeto.id,
          idPerson: objeto.idPerson,
          name: objeto.name,
          departamentName: objeto.departamentName,
          checkDate: objeto.checkDate,
          businessName: objeto.businessName,
          marks: [{ typeMark: objeto.typeMark, hour: objeto.hour }],
        });
      } else {
        encontrado.marks.push({ typeMark: objeto.typeMark, hour: objeto.hour });
      }
      return acumulador;
    }, []);

    console.log(nuevoObjeto);

    const transformedData = nuevoObjeto.map((item) => {
      const marksObject = item.marks.reduce((acc, curr) => {
        acc[curr.typeMark] = curr.hour;
        return acc;
      }, {});
      return { ...item, ...marksObject };
    });

    const DataIndex = [
      {
        headerName: "Empresa",
        field: "businessName",
        filter: true,
        minWidth: 80,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Cedula",
        field: "id",
        filter: true,
        width: 200,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Departamento",
        field: "departamentName",
        filter: true,
        minWidth: 90,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Colaborador",
        field: "name",
        filter: true,
        minWidth: 280,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Fecha",
        field: "checkDate",
        filter: true,
        minWidth: 90,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Entrada Laboral",
        field: "Entrada Laboral",
        filter: true,
        minWidth: 90,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Almuerzo Salida",
        field: "Almuerzo Salida",
        filter: true,
        minWidth: 90,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Almuerzo Regreso",
        field: "Almuerzo Regreso",
        filter: true,
        minWidth: 90,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Salida Laboral",
        field: "Salida Laboral",
        filter: true,
        minWidth: 90,
        rezisable: true,
        sortable: true,
        floatingFilter: true,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
      {
        headerName: "Detalle",
        field: "",
        cellRenderer: ChildMessageRenderer,
        pinned: "left",
        width: 70,
        filter: false,
        cellStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
        headerStyle: () => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      },
    ];

    setInfoData(DataIndex);
    setDataGridView(transformedData);
  }, [dataView]);

  const handleClick = (e) => {
    e.preventDefault();
    const obj = {
      areaId: areaId,
      departamentId: departamentId,
      fromDate: `${fromDate}T00:00:00.000Z`,
      toDate: `${toDate}T12:59:59.999Z`,
    };

    dispatch(getAllDataReport(business, obj));
  };

  return (
    <div className="report-container">
      <header className="header-report-container">
        <Link to="/" onClick={(e) => dispatch(clearStateReport(e))}>
          <img src="/resources/icons/Atras.svg" alt="return"></img>
        </Link>
        <span>REPORTERÍA</span>
      </header>
      <div className="Container-DataFilter">
        <div className="Child-Filter">
          <select
            className="Selected"
            onChange={(e) => {
              e.target.value
                ? setAreaId(parseInt(e.target.value))
                : setAreaId(null);
            }}
          >
            <option value={null} hidden>
              AREA
            </option>
            {areas.map((area, index) => (
              <option key={index + 1} value={area.id}>
                {area.name}
              </option>
            ))}
            <option value="">TODOS</option>
          </select>

          <select
            className="Selected"
            onChange={(e) => {
              e.target.value
                ? setDepartamentId(parseInt(e.target.value))
                : setDepartamentId(null);
            }}
          >
            <option value={null} hidden>
              DEPARTAMENTO
            </option>
            {departaments.map((departament, index) => (
              <option key={index + 1} value={departament.id}>
                {departament.name}
              </option>
            ))}
            <option value="">TODOS</option>
          </select>

          <label className="NameLabel">Desde: </label>
          <input
            className="Selected"
            type="date"
            min="2021-11-01"
            value={fromDate}
            onInput={(e) => setFromDate(e.target.value)}
          />

          <label className="NameLabel">Hasta: </label>
          <input
            className="Selected"
            type="date"
            min="2021-12-01"
            value={toDate}
            onInput={(e) => setToDate(e.target.value)}
          />

          <button onClick={(e) => handleClick(e)} className="SearchButton">
            Buscar
          </button>
        </div>

        {loadingData ? (
          <div className="Child-Data">
            <LoadingApp />
          </div>
        ) : (
          <div className="Child-Data">
            <div className="Container-Table">
              <div
                id="myGrid"
                style={{ width: "100%", height: "100%" }}
                className="ag-theme-alpine"
              >
                <AgGridReact
                  pagination={pagination}
                  paginationPageSize={paginationPageSize}
                  onGridReady={onGridReady}
                  rowData={dataGridView}
                  columnDefs={infoData}
                  defaultColDef={defaultColDef}
                  animateRows={true}
                ></AgGridReact>
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalDetail />
    </div>
  );
};

export default ReportPage;
