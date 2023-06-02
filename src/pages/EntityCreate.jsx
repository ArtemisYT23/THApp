import React from "react";
import { Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { createUser, createEmployee } from "../functions/entities";
//import { ClimbingBoxLoader } from "react-spinners";
const EntityCreate = () => {
  return (
    <div className="entity-create-mainContainer glassBg">
      {/* <div className="entity-create-title-ctn">
        <h1>Nuevo usuario</h1>
      </div>       */}
      <Formik
        initialValues={{
          id: uuidv4(),
          email: "",
          password: null,
          businessId: "",
          idCard: "",
          userName: "",
          name: "",
          surName: "",
          area: "",
          departament: "",
          photo: null,
        }}
        onSubmit={async (values, actions) => {
          try {
            console.log(values);
            const responseUser = await createUser(values);
            console.log(responseUser);
            const responseEmployee = await createEmployee(values);
            console.log(responseEmployee);
            const clearCacheData = () => {
              caches.keys().then((names) => {
                names.forEach((name) => {
                  caches.delete(name);
                });
              });
              alert("Complete Cache Cleared");
            };
            actions.resetForm();
            clearCacheData(values.id)
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, isSummitting }) => (
          <Form onSubmit={handleSubmit} className="entity-create-formCreate">
            <div className="entity-create-formCreate-MaininputCtn">
              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>Cedula:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"idCard"}
                    placeholder="Ingrese una cedula"
                    onChange={handleChange}
                    value={values.idCard}
                    required
                  />
                </div>
              </div>

              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>Nombres:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"name"}
                    placeholder={"Ingrese los nombres"}
                    onChange={handleChange}
                    value={values.name}
                    required
                  />
                </div>
              </div>

              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>Apellidos:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"surName"}
                    placeholder={"Ingrese los apellidos"}
                    onChange={handleChange}
                    value={values.surName}
                    required
                  />
                </div>
              </div>

              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>Area:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"area"}
                    placeholder={"Ingrese el area"}
                    onChange={handleChange}
                    value={values.area}
                    required
                  />
                </div>
              </div>

              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>Departamento:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"departament"}
                    placeholder={"Ingrese el departamento"}
                    onChange={handleChange}
                    value={values.departament}
                    required
                  />
                </div>
              </div>

              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>Correo:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"email"}
                    placeholder={"Ingrese el correo electronico"}
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </div>
              </div>

              <div className="entity-create-inputCtn">
                <div className="entity-create-inputCtn-label">
                  <label>businessId:</label>
                </div>
                <div className="entity-create-inputCtn-input">
                  <input
                    type="text"
                    name={"businessId"}
                    placeholder={"Empresa"}
                    onChange={handleChange}
                    value={values.businessId}
                    required
                  />
                </div>
              </div>
              {/* <input type="text" name={"username"} placeholder={"Ingrese el departamento"} onChange={handleChange} value={values.idCard}/>
          <input type="text" name={"departament"} placeholder={"Ingrese el departamento"} onChange={handleChange} value={values.departament}/> */}
              {/* <label>Foto:</label>
          <input type="file" name={"photo"} placeholder={"Seleccione una foto"} onChange={handleChange} value={values.photo}/> */}
              <div className="entity-create-formCreate-buttonsCtn">
                <button type={"submit"}>
                  {isSummitting ? "Guardando.." : "Crear usuario"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EntityCreate;
