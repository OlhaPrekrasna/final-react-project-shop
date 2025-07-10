import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs'; // Латинская "C"
import styles from '../Categories/Categories.module.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); // Добавлено состояние ошибки

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://pet-shop-backend.slavab.kz/products/all'
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('An error occurred fetching data. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="globalContainer">
      <div className={styles.categoriesPage}>
        <BreadCrumbs
          items={[
            { path: '/', label: 'Main page' },
            { path: '/categories', label: 'Categories', isActive: true },
          ]}
        />

        <div className={styles.categoriesPageTitle}>
          <h2>Categories</h2>
        </div>

        {error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : (
          <ul className={styles.gridCategoriesContainer}>
            {categories.slice(0, 8).map((category) => (
              <li key={category.id} className={styles.gridCategoriesItem}>
                <Link
                  to={`/categories/${category.id}`}
                  className={styles.categoryItem}
                >
                  <img
                    src={`https://pet-shop-backend.slavab.kz${category.image}`}
                    alt={category.title || 'Category image'}
                    className={styles.categoryImage}
                  />
                  <h3 className={styles.categoryName}>{category.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;






// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import BreadСrumbs from '../../components/BreadCrumbs/BreadCrumbs';
// import styles from '../Categories/Categories.module.css';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           'https://pet-shop-backend.slavab.kz/products/all'
//         );
//         setCategories(response.data || []);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         setError('An error occurred fetching data. Please try again later.');
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="globalContainer">
//       <div className={styles.categoriesPage}>
//         <BreadСrumbs
//           items={[
//             { path: '/', label: 'Main page' },
//             { path: '/categories', label: 'Categories', isActive: true },
//           ]}
//         />

//         <div className={styles.categoriesPageTitle}>
//           <h2>Categories</h2>
//         </div>

//         <ul className={styles.gridCategoriesContainer}>
//           {categories.slice(0, 8).map((category) => (
//             <li key={category.id} className={styles.gridCategoriesItem}>
//               <Link
//                 to={`/categories/${category.id}`}
//                 className={styles.categoryItem}
//               >
//                 <img
//                   src={`https://pet-shop-backend.slavab.kz${category.image}`}
//                   alt={category.title}
//                   className={styles.categoryImage}
//                 />
//                 <h3 className={styles.categoryName}>{category.title}</h3>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Categories;
