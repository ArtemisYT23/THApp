import { setMarkIndexAction } from "../../states/checkReducer";
import { useDispatch } from "react-redux";
import "./css/button.css";
const ButtonMark = ({
  index,
  name,
  background,
  color,
  action,
  disabled,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      className='button'
      onClick={() => {
        action();
        dispatch(setMarkIndexAction(index));
      }}
      style={
        disabled
          ? disabled[`disabled${index}`]
            ? {
                background: "#BCBCBC",
                color: `var(${color})`,
              }
            : {
                background: `linear-gradient(90deg, var(${background}) 0%, var(--degradeColor) 100%)`,
                color: `var(${color})`,
              }
          : {
              background: `linear-gradient(90deg, var(${background}) 0%, var(--degradeColor) 100%)`,
              color: `var(${color})`,
            }
      }
      disabled={disabled ? disabled[`disabled${index}`] : false}
    >
      {name}
    </button>
  );
};

export default ButtonMark;
