import "./css/button.css";
const Button = ({
  name,
  background,
  color,
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
        background: `linear-gradient(90deg, var(${background}) 0%, var(--degradeColor) 100%)`,
        color: `var(${color})`,
      }}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default Button;
