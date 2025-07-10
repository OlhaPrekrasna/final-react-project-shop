import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

// Импорт изображений
import logo from '../../assets/icons/logo.svg';
import cart from '../../assets/icons/cart.svg';

const Header = () => {
  // Получаем товары из корзины
  const cartElements = useSelector((state) => state.cart.items);

  // Считаем количество всех товаров
  const cartElementsCount = cartElements.reduce(
    (total, element) => total + element.quantity,
    0
  );

  // Состояние открытия бургер-меню
  const [openMenu, setOpenMenu] = useState(false);

  // Переключатель меню
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className="globalContainer">
        <div className={styles.headerContent}>
          {/* Логотип */}
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" />
          </Link>

          {/* Бургер-меню */}
          <div
            className={`${styles.burgerMenu} ${openMenu ? styles.open : ''}`}
            onClick={toggleMenu}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </div>

          {/* Навигация */}
          <nav className={`${styles.navBlock} ${openMenu ? styles.open : ''}`}>
            <ul className={styles.navList}>
              <li>
                <Link to="/" className={styles.navLink}>
                  Main Page
                </Link>
              </li>
              <li>
                <Link to="/categories" className={styles.navLink}>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/products" className={styles.navLink}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/discounted-products" className={styles.navLink}>
                  All Sales
                </Link>
              </li>
            </ul>
          </nav>

          {/* Корзина */}
          <Link to="/cart" className={styles.cartLink}>
            <img src={cart} alt="Cart" />
            {cartElementsCount > 0 && (
              <span className={styles.cartBadge}>{cartElementsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;





// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import styles from './Header.module.css';
// import Logo from '../../assets/icons/logo.svg';
// import cartIcon from '../../assets/icons/cart.svg';

// function Header() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const [openMenu, setOpenMenu] = useState(false);

//   const toggleMenu = () => {
//     setOpenMenu(!openMenu);
//   };

//   return (
//     <header className={styles.Header}>
//       <div className="globalContainer">
//         <div className={styles.headerContent}>
//           <Link to="/">
//             <img src={Logo} alt="Logo" />
//           </Link>
//           <div
//             className={`${styles.burgerMenu} ${openMenu ? styles.open : ''}`}
//             onClick={toggleMenu}
//           >
//             <span className={styles.burgerLine}></span>
//             <span className={styles.burgerLine}></span>
//             <span className={styles.burgerLine}></span>
//           </div>
//           <nav className={`${styles.navBlock} ${openMenu ? styles.open : ''}`}>
//             <ul>
//               <li>
//                 <Link to="/" className={styles.navLink}>Main Page</Link>
//               </li>
//               <li>
//                 <Link to="/categories" className={styles.navLink}>Categories</Link>
//               </li>
//               <li>
//                 <Link to="/products" className={styles.navLink}>All Products</Link>
//               </li>
//               <li>
//                 <Link to="/discounted-products" className={styles.navLink}>All Sales</Link>
//               </li>
//             </ul>
//           </nav>
//           <Link to="/cart" className={styles.cartLink}>
//             <img src={cartIcon} alt="Cart" />
//             {cartItemsCount > 0 && (
//               <span className={styles.cartBadge}>{cartItemsCount}</span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;