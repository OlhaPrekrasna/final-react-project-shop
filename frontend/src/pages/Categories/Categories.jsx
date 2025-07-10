import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import styles from '../Categories/Categories.module.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3333/categories/all'
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
                    src={`http://localhost:3333${category.image}`}
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
