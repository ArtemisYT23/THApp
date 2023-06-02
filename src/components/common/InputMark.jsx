import { setPhotoAction, setMarkIndexAction } from "../../states/checkReducer";
import { useDispatch } from "react-redux";

import "./css/inputMark.css";
const InputMark = ({
  index,
  name,
  backgroundColor,
  color,
  action,
  disabled,
}) => {
  const dispatch = useDispatch();
  const takePhoto = e => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = e => {
      dispatch(setPhotoAction(reader.result));
      action();
    };
  };
  return (
    <label
      className='button'
      style={
        disabled
          ? disabled[`disabled${index}`]
            ? {
                backgroundColor: "#BCBCBC",
                color: `var(${color})`,
              }
            : {
                backgroundColor: `var(${backgroundColor})`,
                color: `var(${color})`,
              }
          : {
              backgroundColor: `var(${backgroundColor})`,
              color: `var(${color})`,
            }
      }
    >
      {name}
      <input
        className='input-mark'
        type='file'
        disabled={disabled ? disabled[`disabled${index}`] : false}
        accept='image/*'
        capture='user'
        onInput={e => {
          dispatch(setMarkIndexAction(index));
          takePhoto(e);
        }}
      />
    </label>
  );
};

export default InputMark;
