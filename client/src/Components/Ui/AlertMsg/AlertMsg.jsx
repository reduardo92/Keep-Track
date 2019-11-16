import React, { useContext } from 'react';
import styled from 'styled-components';
import AlertContext from '../../Context/alert/AlertContext';

const Styled = styled.div`
  position: fixed;
  top: 10vh;
  left: 0;
  right: 0;
  z-index: 10;
  max-width: 350px;
  margin: 0 auto;
  text-align: center;
  font-family: var(--primary--fn);
  font-weight: bold;
  font-size: 1.1rem;
`;

const AlertMsg = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map(({ msg, typeFor, id }) => (
      <Styled key={id} className={`alert alert-${typeFor}`}>
        <i className='fas fa-info-circle'></i> {msg}
      </Styled>
    ))
  );
};

export default AlertMsg;
