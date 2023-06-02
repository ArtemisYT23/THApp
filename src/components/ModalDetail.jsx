import { Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalDetails } from "../states/ReportDataReducer";
import styled from "styled-components";
import { useState } from "react";

const useStyless = makeStyles((theme) => ({
  Detailmodal: {
    position: "absolute",
    width: "450px",
    height: "500px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      display: "none",
    },
  },
  textfield: {
    width: "80%",
    margin: "1rem 0 0 0",
  },
  container: {
    textAlign: "center",
  },
}));

export const ModalDetail = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { reportState } = useSelector((store) => store);
  const { openDetail, selectedPerson } = reportState;
  const [term, setTerm] = useState("");

  function searchingTerm(term) {
    return function (x) {
      return x.checkDate.includes(term) || !term;
    };
  }

  const cabinet = (
    <div className={styless.Detailmodal}>
      <br />
      <div align="center">
        <TitleModal>Informacion De Marcaciones</TitleModal>
        <br />
        <br />

        <SearchUser
            placeholder=" Buscar fecha"
            onChange={(e) => setTerm(e.target.value)}
          />

          <br />
        <TextField
          value={selectedPerson[0]?.name + " " + selectedPerson[0]?.surName}
          label="nombre del colaborador"
          className={styless.textfield}
        />

        <br />
        <TextField
          value={selectedPerson[0]?.idCard}
          label="Cedula De Identidad"
          className={styless.textfield}
        />

        <br />

        {selectedPerson.filter(searchingTerm(term)).map((person, i) => (
          <ContainerInfo key={i}>
            <br />
            <TextField
              value={person.checkDate.slice(0, 10)}
              label="Fecha"
              className={styless.textfield}
            />

            <br />
            <TextField
              value={person.markName + " " + person.hour.slice(0, 5)}
              label="Detalle y Hora"
              className={styless.textfield}
            />
            <br />
            <br />
            <div align="center">
              <a
                href={`https://www.google.com/maps?q=${person.latitude},${person.longitude}&z=17&hl=es`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?zoom=18&size=360x200&maptype=roadmap&markers=color:red%7C${person.latitude},${person.longitude}&key=AIzaSyA9QZmX8WtUqd_ahrXfQL7bEYkuXqB2igg`}
                  alt="...cargando"
                />
              </a>
            </div>
          </ContainerInfo>
        ))}
      </div>
    </div>
  );

  const abrirCerrarModal = () => {
    dispatch(setOpenModalDetails(false));
  };

  return (
    <div className={styless.container}>
      <Modal open={openDetail} onClose={abrirCerrarModal}>
        {cabinet}
      </Modal>
    </div>
  );
};

export const TitleModal = styled.span`
  color: var(--primaryColor);
  font-size: 1.4rem;
  padding: 0 0 0.5rem 0;
  font-weight: bold;
`;

export const ContainerInfo = styled.div`
  border: 1px solid var(--primaryColor);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 13px;
  margin: 1rem 0 1rem 0;
  padding: 0.5rem;
  width: 90%;
`;

const SearchUser = styled.input`
  width: 90%;
  height: 2.5rem;
  outline: none;
  border: 1px solid var(--primaryColor);
  color: #5d5c5c;
  border-radius: 13px;
  margin: 1rem 0 1rem 0;
  /* @media (max-width: 767px) {
   width: 60%;
  } */
`;