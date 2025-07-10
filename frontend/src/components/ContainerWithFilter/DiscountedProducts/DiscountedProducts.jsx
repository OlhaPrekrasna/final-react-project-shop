import React from 'react';
import styles from './DiscountedProducts.module.css';

const DiscountedProducts = ({ searchParams, setSearchParams }) => {
  const includeDiscount = searchParams.get("includeDiscount") === "true";

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    const newSearchParams = new URLSearchParams(searchParams);
    if (checked) {
      newSearchParams.set("includeDiscount", "true");
    } else {
      newSearchParams.delete("includeDiscount");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <label className={styles.discountedProducts}>
      <span>Discounted items</span>
      <input
        className={styles.customCheckbox}
        type="checkbox"
        checked={includeDiscount}
        onChange={handleCheckboxChange}
      />
      <span></span>
    </label>
  );
};

export default DiscountedProducts;