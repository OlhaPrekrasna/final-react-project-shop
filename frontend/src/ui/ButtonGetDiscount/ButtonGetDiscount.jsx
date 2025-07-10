import React, { useState } from 'react';
import styles from '../ButtonGetDiscount/ButtonGetDiscount.module.css';

function ButtonGetDiscount({ onClick, disabled, type = 'button' }) {
  const [state, setState] = useState('normal');

  const handleClick = (e) => {
    if (disabled) return;

    if (type !== 'submit') {
      setState('added');
      if (onClick) {
        onClick(e);
      }
      setTimeout(() => setState('normal'), 2000);
    }
  };

  return (
    <button
      type={type}
      className={`${styles.ButtonGetDiscount} ${state === 'added' ? styles.addedState : ''} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {state === 'added' && type !== 'submit' ? 'Request Submitted' : 'Get a discount'}
    </button>
  );
}

export default ButtonGetDiscount;
