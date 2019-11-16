import React from 'react';
import styled from 'styled-components';
// import './spinner.css';

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;

  .loadingspinner {
    pointer-events: none;
    width: 2.5em;
    height: 2.5em;
    border: 0.4em solid transparent;
    border-color: #eee;
    border-top-color: var(--primary--clr);
    border-radius: 50%;
    animation: loadingspin 1s linear infinite;
  }

  @keyframes loadingspin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => (
  <Styled>
    <div className='loadingspinner'></div>
  </Styled>
  // <div className='loader'>
  //   <span />
  //   <span />
  //   <span />
  // </div>
);
export default Spinner;
