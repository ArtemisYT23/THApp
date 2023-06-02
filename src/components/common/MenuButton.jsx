import "../common/css/menubutton.css";

const MenuButton = ({ name, disabled = false,action = () => {}}) => {
  return (    
    <button
      className="menu-button"
      disabled={disabled}
      onClick={() => {        
        action();
      }}
    >
      {name}
    </button>
  );
};

export default MenuButton;
