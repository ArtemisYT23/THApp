import "./css/icon.css";
const Icon = ({ src, onPress }) => {
  return (
    <div onClick={onPress} className='icon-container'>
      <img src={src} alt='icon'></img>
    </div>
  );
};

export default Icon;
