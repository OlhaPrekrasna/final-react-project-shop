import { useState } from 'react';
import styles from '../ButtonAddBlue/ButtonAddBlue.module.css';

function ButtonAddBlue({ onClick }) {
  const [state, setState] = useState('normal');

  const handleClick = (e) => {
    setState('added');
    if (onClick) {
      onClick(e);
    }
    setTimeout(() => setState('normal'), 2000);
  };

  return (
    <button
      className={`${styles.ButtonAddBlue} ${state === 'added' ? styles.addedState : ''}`}
      onClick={handleClick}
    >
      {state === 'added' ? 'Added' : 'Add to cart'}
    </button>
  );
}

export default ButtonAddBlue;