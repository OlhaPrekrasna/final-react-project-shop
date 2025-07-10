import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import ModalBlock from './ModalBlock';

function ModalConnect() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const content = Array.isArray(modal.content) ? modal.content : [];

  return (
    <ModalBlock isOpen={modal.isOpen} onClose={handleClose}>
      <h2>{modal.title}</h2>
      <div>
        {content.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>
    </ModalBlock>
  );
}

export default ModalConnect;