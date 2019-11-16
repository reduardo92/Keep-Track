import React from 'react';
import Button from '../button/Button';
import ModalStyle from './ModalStyle';

const VerticalModal = ({ show, onHide, submit, title, children }) => {
  return (
    <ModalStyle
      show={show}
      onHide={onHide}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <ModalStyle.Header closeButton>
        <h3 className='modal--title'>{title}</h3>
      </ModalStyle.Header>
      <ModalStyle.Body>{children}</ModalStyle.Body>
      <ModalStyle.Footer>
        <Button
          onClick={submit}
          title='submit'
          type='submit'
          addClass='btn-block'
        />
        <Button
          onClick={onHide}
          title='close'
          type='submit'
          addClass='btn-block'
        />
      </ModalStyle.Footer>
    </ModalStyle>
  );
};

export default VerticalModal;
