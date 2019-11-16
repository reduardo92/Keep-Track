import React from 'react';
import styled from 'styled-components';

const HeroBgStyled = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-attachment: fixed;
  border-radius: 0 0 60% 60% / 10%;
  overflow: hidden;
  background: ${props => props.linearBg};
  padding: 135px 0 120px;
`;

const HeroBg = ({ linearBg, children }) => {
  return (
    <HeroBgStyled linearBg={linearBg} className='hero-bg'>
      {children}
    </HeroBgStyled>
  );
};

export default HeroBg;

HeroBg.defaultProps = {
  linearBg: 'var(--home-LG)'
};
