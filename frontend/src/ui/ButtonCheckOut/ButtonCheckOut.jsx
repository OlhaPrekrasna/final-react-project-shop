import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../ButtonCheckOut/ButtonCheckOut.module.css';

function ButtonCheckOut() {
  return (
    <Link to="/discounted-products" className={styles.buttonStyle}>
      Check out
    </Link>
  );
}

export default ButtonCheckOut;