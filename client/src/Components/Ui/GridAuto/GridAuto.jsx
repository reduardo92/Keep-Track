import React from 'react';
import styled from 'styled-components';

const Styled = styled.section`
  display: grid;
  grid-row-gap: 5em;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  text-align: center;
  align-items: end;

  @media screen and (min-width: 760px) {
    grid-gap: 3em;
  }
`;

const GridAuto = ({ children }) => {
  return <Styled className='grid--auto'>{children}</Styled>;
};

export default GridAuto;
