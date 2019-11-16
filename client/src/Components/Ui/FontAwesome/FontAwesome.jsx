import React from 'react';
import styled from 'styled-components';

const Styled = styled.i`
  color: ${props => props.clr};
  font-size: 25px;
  transition: all 0.35s ease-in-out;
  cursor: ${props => (props.noHover ? null : 'pointer')};

  &:hover,
  &:focus {
    color: ${props => props.noHover || 'red'};
  }
`;

const FontAwesome = ({ font, clr, noHover }) => (
  <Styled className={`icon ${font}`} clr={clr} noHover={noHover} />
);

export default FontAwesome;
