import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

const ModalStyle = styled(Modal)`
  .modal--title {
    font-size: 1.9rem;
    font-weight: bold;
    font-family: var(--primary--fn);
    color: var(--grey--clr);
  }
`;

export default ModalStyle;
