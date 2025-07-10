import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import ButtonAddBlue from '../../ui/ButtonAddBlue/ButtonAddBlue';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import Counter from '../../components/Counter/Counter';
import styles from './ProductDetails.module.css';
import { addToCart } from '../../redux/cartSlice';

const API_URL = 'https://pet-shop-backend.slavab.kz';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productResponse = await axios.get(
          `${API_URL}/products/${productId}`
        );

        // Предполагаем, что API возвращает объект продукта, а не массив
        if (productResponse.data) {
          setProduct(productResponse.data);
        } else {
          setProduct(null);
          setError('Product not found.');
        }

        const categoriesResponse = await axios.get(`${API_URL}/categories/all`);
        setCategories(categoriesResponse.data || []);
      } catch (fetchError) {
        setError(
          'An error occurred while fetching product details. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [productId]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.title : 'Unknown Category';
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (error)
    return (
      <div
        style={{
          color: 'red',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        {error}
      </div>
    );

  if (!product) return <p>Product not found.</p>;

  // Проверка поля discount_price — исправил имя поля на discount_price (проверь в API)
  const discountPrice = product.discount_price || null;

  return (
    <div className="globalContainer">
      <div className={styles.productDetailsPage}>
        <BreadCrumbs
          items={[
            { path: '/', label: 'Main page' },
            { path: '/categories', label: 'Categories' },
            {
              path: `/categories/${product.categoryId}`,
              label: getCategoryName(product.categoryId),
            },
            {
              path: `/products/${productId}`,
              label: product.title,
              isActive: true,
            },
          ]}
        />

        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            <img
              src={`${API_URL}${product.image}`}
              alt={product.title}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>

            <div className={styles.productPrice}>
              <span className={styles.currentPrice}>
                ${discountPrice ?? product.price}
              </span>
              {discountPrice && (
                <>
                  <span className={styles.originalPrice}>${product.price}</span>
                  <span className={styles.discountFlag}>
                    -
                    {Math.round(
                      ((product.price - discountPrice) / product.price) * 100
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            <div className={styles.counterAndButton}>
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <ButtonAddBlue onClick={handleAddToCart} />
            </div>

            <div className={styles.productDescription}>
              <h3>Description</h3>
              {product.description ? (
                <>
                  <p
                    className={`${styles.productDescriptionText} ${
                      isExpanded ? styles.expanded : styles.collapsed
                    }`}
                  >
                    {product.description}
                  </p>
                  <button
                    className={styles.readMoreButton}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Close' : 'More'}
                  </button>
                </>
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
