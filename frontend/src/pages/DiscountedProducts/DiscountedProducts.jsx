import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import Filter from '../../components/ContainerWithFilter/Filter/Filter';
import SortSelect from '../../components/ContainerWithFilter/SortSelect/SortSelect';
import styles from './DiscountedProducts.module.css';

const DiscountedProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(
    searchParams.get('sortType') || 'default'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Локальные состояния для фильтров (читаем из searchParams)
  const [minPrice, setMinPrice] = useState(
    parseFloat(searchParams.get('minPrice')) || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    parseFloat(searchParams.get('maxPrice')) || Infinity
  );
  const [includeDiscount, setIncludeDiscount] = useState(
    searchParams.get('includeDiscount') === 'true'
  );

  // Синхронизация sortType с URL
  useEffect(() => {
    if (sortType === 'default') {
      searchParams.delete('sortType');
    } else {
      searchParams.set('sortType', sortType);
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  // Синхронизация локальных фильтров с URL
  useEffect(() => {
    setMinPrice(parseFloat(searchParams.get('minPrice')) || 0);
    setMaxPrice(parseFloat(searchParams.get('maxPrice')) || Infinity);
    setIncludeDiscount(searchParams.get('includeDiscount') === 'true');
  }, [searchParams]);

  // Получаем данные с API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:3333/products/all');
        const discountedProducts = response.data.filter(
          (product) => product.discont_price
        ); // оставляю discont_price, если так в API
        setProducts(discountedProducts);
      } catch (fetchError) {
        console.error('Error fetching products:', fetchError);
        setError(
          'An error occurred while fetching products. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Фильтрация и сортировка продуктов
  useEffect(() => {
    const filtered = products.filter((product) => {
      const productPrice = product.discont_price || product.price;
      if (productPrice < minPrice || productPrice > maxPrice) return false;
      if (includeDiscount && !product.discont_price) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortType === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortType === 'priceHighToLow') {
        return (b.discont_price || b.price) - (a.discont_price || a.price);
      }
      if (sortType === 'priceLowToHigh') {
        return (a.discont_price || a.price) - (b.discont_price || b.price);
      }
      return 0;
    });

    setFilteredProducts(sorted);
  }, [products, minPrice, maxPrice, includeDiscount, sortType]);

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

  return (
    <div className="globalContainer">
      <div className={styles.discountedProducts}>
        <BreadCrumbs
          items={[
            { path: '/', label: 'Main page' },
            { path: '/categories', label: 'Discounted items', isActive: true },
          ]}
        />
        <div className={styles.pageTitle}>
          <h2>Discounted items</h2>
        </div>
        <div className={styles.filterContainer}>
          <Filter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <div className={styles.selectSort}>
            <span className={styles.sortTitle}>Sorted by</span>
            <SortSelect
              sortType={sortType}
              setSortType={setSortType}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
        <div className={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No discounted products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountedProducts;
