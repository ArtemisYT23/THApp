import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilterAction } from "../states/saReducer";
//import {createUserPage} from "../functions/entities";
import Icon from "./common/Icon";

import "./css/footerSA.css";
const FooterSA = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSearchClicked, setIsSearchClicked] = useState(false); //search button state
  const [isCreateClicked, setIsCreateClicked] = useState(false); //add button state
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!isSearchClicked) {
      setFilter("");
      dispatch(setFilterAction(""));
    }
    return () => {
      setFilter("");
      dispatch(setFilterAction(""));
    };
  }, [isSearchClicked, dispatch]);

  useEffect(() => {
    if (!isCreateClicked) {
      navigate("create");      
    }
  }, [isCreateClicked]);

  return (    
    <footer
      className="footer-sa-container"
      style={isSearchClicked ? { justifyContent: "space-between" } : {}}
    >
      <Icon
        src="/resources/icons/Buscar.svg"
        onPress={() => setIsSearchClicked(!isSearchClicked)}
      />
      {isSearchClicked ? (
        <input
          type="text"
          value={filter}
          onInput={(e) => {
            setFilter(e.target.value);
            dispatch(setFilterAction(e.target.value));
          }}
        />
      ) : (
        <></>
      )}
    </footer>
  );
};

export default FooterSA;
