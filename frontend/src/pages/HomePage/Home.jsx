import React from 'react';

import ButtonCheckOut from '../../ui/ButtonCheckOut/ButtonCheckOut';
import Categories from '../../components/Categories/Categories';
import FormForDiscount from '../../components/FormForDiscount/FormForDiscount';
import Sale from '../../components/Sale/Sale';

import styles from '../HomePage/Home.module.css';

import backgroundImg from '../../assets/images/bg_home.png';

function Home() {
  return (
    <div>
      <div className="globalContainer">
        <div className={styles.contentStyle}>
          <h1>
            Amazing Discounts <br /> on Pets Products!
          </h1>
          <ButtonCheckOut />
        </div>
      </div>
      <div
        className={styles.mainBgStyle}
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      <Categories />
      <FormForDiscount />
      <Sale />
    </div>
  );
}

export default Home;
