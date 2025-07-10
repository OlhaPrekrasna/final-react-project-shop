import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

import logo from '../../assets/icons/logo.svg';
import cart from '../../assets/icons/cart.svg';

const Header = () => {
  const cartElements = useSelector((state) => state.cart.items);

  const cartElementsCount = cartElements.reduce(
    (total, element) => total + element.quantity,
    0
  );

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className="globalContainer">
        <div className={styles.headerContent}>
          <NavLink to="/" className={styles.logo}>
            <img src={logo} alt="Logo" />
          </NavLink>

          <div
            className={`${styles.burgerMenu} ${openMenu ? styles.open : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </div>

          <nav className={`${styles.navBlock} ${openMenu ? styles.open : ''}`}>
            <ul className={styles.navList}>
              <li>
                <NavLink to="/" className={getNavLinkClass}>
                  Main Page
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={getNavLinkClass}>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={getNavLinkClass}>
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/discounted-products" className={getNavLinkClass}>
                  All Sales
                </NavLink>
              </li>
            </ul>
          </nav>

          <NavLink to="/cart" className={styles.cartLink}>
            <img src={cart} alt="Cart" />
            {cartElementsCount > 0 && (
              <span className={styles.cartBadge}>{cartElementsCount}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
