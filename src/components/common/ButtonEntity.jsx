import "./css/button.css";
const ButtonEntity = ({
  name,
  backgroundColor,
  color,
  entity,
  action = () => {},
  onPress = () => {},
  disabled = false,
}) => {
  return (
    <button
      className='button'
      onClick={() => {
        onPress();
        action();
      }}
      style={{
        backgroundColor: `var(${backgroundColor})`,
        color: `var(${color})`,
      }}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default ButtonEntity;
