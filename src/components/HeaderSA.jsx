import { useSelector, useDispatch } from "react-redux";
import { setIsMenuOpenAction } from "../states/saReducer";
import "./css/headerSA.css";
import MenuSA from "./MenuSA";
const HeaderSA = () => {
  const dispatch = useDispatch();
  const { entityName, isMenuOpen } = useSelector(store => store.sa);

  return (
    <header className='header-container'>
      <div className='return-container' style={{ display: "none" }}>
        <svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_4_100)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M26.6274 60.2843L1.17157 34.8284C-0.390526 33.2663 -0.390526 30.7337 1.17157 29.1716L26.6274 3.71572C28.1895 2.15363 30.7222 2.15363 32.2843 3.71572C33.8464 5.27782 33.8464 7.81048 32.2843 9.37258L13.6569 28L60 28C62.2091 28 64 29.7909 64 32C64 34.2091 62.2091 36 60 36L13.6569 36L32.2843 54.6274C33.8464 56.1895 33.8464 58.7222 32.2843 60.2843C30.7222 61.8464 28.1895 61.8464 26.6274 60.2843Z'
              fill='black'
            />
          </g>
          <defs>
            <clipPath id='clip0_4_100'>
              <rect width='64' height='64' fill='none' />
            </clipPath>
          </defs>
        </svg>        
      </div>
      <span>{entityName || "Panel de Control"}</span>
      <div
        className='header-selector'
        onClick={() => dispatch(setIsMenuOpenAction(!isMenuOpen))}
      >
        <svg viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_4_26)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M-3.49691e-07 32C-1.56562e-07 29.7909 1.79086 28 4 28L60 28C62.2091 28 64 29.7909 64 32C64 34.2091 62.2091 36 60 36L4 36C1.79086 36 -5.4282e-07 34.2091 -3.49691e-07 32Z'
              fill='var(--white)'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M-3.49691e-07 52C-1.56562e-07 49.7909 1.79086 48 4 48L60 48C62.2091 48 64 49.7909 64 52C64 54.2091 62.2091 56 60 56L4 56C1.79086 56 -5.4282e-07 54.2091 -3.49691e-07 52Z'
              fill='var(--white)'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M-3.49691e-07 12C-1.56562e-07 9.79086 1.79086 8 4 8L60 8.00001C62.2091 8.00001 64 9.79087 64 12C64 14.2091 62.2091 16 60 16L4 16C1.79086 16 -5.4282e-07 14.2091 -3.49691e-07 12Z'
              fill='var(--white)'
            />
          </g>
          <defs>
            <clipPath id='clip0_4_26'>
              <rect width='64' height='64' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
      {isMenuOpen ? <MenuSA /> : <></>}
    </header>
  );
};

export default HeaderSA;
