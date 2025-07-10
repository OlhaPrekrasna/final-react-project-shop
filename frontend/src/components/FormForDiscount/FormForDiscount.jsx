import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../redux/modalSlice';
import ButtonGetDiscount from '../../ui/ButtonGetDiscount/ButtonGetDiscount';
import styles from './FormForDiscount.module.css';
import discountImage from '../../assets/images/pets.png';

function FormForDiscount() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormTouched(true);

    if (!isFormValid() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3333/sale/send', {
        name,
        phone,
        email,
      });

      if (response.status === 200) {
        dispatch(
          openModal({
            title: 'Success',
            content: ['Your request has been submitted successfully!'],
          })
        );
        setIsSubmitted(true);
        clearForm();
      }
    } catch (error) {
      dispatch(
        openModal({
          title: 'Error',
          content:
            'There was an error submitting your request. Please try again later.',
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNameValid = () => /^[A-Za-z\s]+$/.test(name);
  const isPhoneValid = () => /^\d{10,15}$/.test(phone);
  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () => isNameValid() && isPhoneValid() && isEmailValid();

  const clearForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setFormTouched(false);
  };

  //   const handleCloseModal = () => {
  //     dispatch(closeModal());
  //     clearForm();
  //   };

  return (
    <div className="globalContainer">
      <div className={styles.formForDiscountContainer}>
        <h2>5% off on the first order</h2>
        <div className={styles.formContainer}>
          <div className={styles.imageContainer}>
            <img
              src={discountImage}
              alt="Discount"
              className={styles.discountImage}
            />
          </div>
          <div className={styles.formContent}>
            <form
              onSubmit={handleSubmit}
              className={styles.formGroupBox}
              noValidate
            >
              <div className={styles.formGroup}>
                <label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-invalid={formTouched && !isNameValid()}
                    aria-describedby="name-error"
                  />
                  {formTouched && !isNameValid() && (
                    <div id="name-error" className={styles.tooltip}>
                      Please enter a valid name (letters and spaces only).
                    </div>
                  )}
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="tel"
                    value={phone}
                    placeholder="Phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    aria-invalid={formTouched && !isPhoneValid()}
                    aria-describedby="phone-error"
                  />
                  {formTouched && !isPhoneValid() && (
                    <div id="phone-error" className={styles.tooltip}>
                      Please enter a valid phone number (10–15 digits).
                    </div>
                  )}
                </label>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={formTouched && !isEmailValid()}
                    aria-describedby="email-error"
                  />
                  {formTouched && !isEmailValid() && (
                    <div id="email-error" className={styles.tooltip}>
                      Please enter a valid email address.
                    </div>
                  )}
                </label>
              </div>

              <ButtonGetDiscount
                type="submit"
                disabled={!isFormValid() || isSubmitting || isSubmitted}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormForDiscount;
