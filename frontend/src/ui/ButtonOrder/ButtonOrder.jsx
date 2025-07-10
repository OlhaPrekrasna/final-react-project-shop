import React, { useState } from 'react';
import styles from '../ButtonOrder/ButtonOrder.module.css';

function ButtonOrder({ onClick, disabled }) {
  const [state, setState] = useState('normal');

  const handleClick = (e) => {
    if (disabled) return;

    setState('order');
    if (onClick) {
      onClick(e);
    }
    setTimeout(() => setState('ordered'), 2000);
  };

  return (
    <button
      className={`
        ${styles.ButtonOrder} 
        ${state === 'ordered' ? styles.orderedState : ''} 
        ${disabled ? styles.disabled : ''}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {state === 'ordered' ? 'The order is placed' : 'Place order'}
    </button>
  );
}

export default ButtonOrder;
