import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './Sale.module.css';
import ProductCard from '../ProductCard/ProductCard';

const Sale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pet-shop-backend.slavab.kz/products/all');
        const discountedProducts = response.data.filter(product => product.discont_price);
        setProducts(discountedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="globalContainer">
      <div className={styles.sale}>
        
        <div className="blockTitle">
          <h2>Sale</h2>
          <div className="blockTitleLine"></div>
          <Link to="/discounted-products" className="blockTitleButton">
            All sales
          </Link>
        </div>

        <ul className={styles.gridProductContainer}>
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default Sale;