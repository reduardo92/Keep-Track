import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyle = styled(Link)`
  cursor: pointer;
  color: var(--light--blue--clr);
  background: var(--white--clr);
  border-radius: 50px;
  box-shadow: 0 3px 7px 0 #00000033;
  font-weight: bold;
  font-family: var(--primary--fn);
  font-size: 1.1rem;
  padding: 10px 20px;
  margin-bottom: 50px;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transform: translate(0, 0);
  transition: var(--ease--in--out--05s);

  :hover,
  :focus,
  :active {
    border: 2px solid #ffffff;
    opacity: 0.8;
    background-color: var(--primary--clr);
    color: var(--white--clr);
    transform: translate(0, -5px);
    box-shadow: 0px 9px 7px #00000057;
  }

  @media screen and (min-width: 760px) {
    font-size: ${props => props.tabletmd};
  }
  @media screen and (min-width: 1280px) {
    font-size: 1.2rem;
  }
`;

const Styled = styled.button`
  background-color: var(--primary--clr);
  color: var(--white--clr);
  font-family: var(--primary--fn);
  font-weight: bold;
  font-size: 1.3rem;

  &:hover,
  &:focus {
    background-color: transparent;
    color: var(--primary--clr);
    border: 3px solid var(--primary--clr);
  }
`;

const Button = ({ title, addClass = '', onClick }) => {
  return (
    <Styled onClick={onClick} className={`btn ${addClass}`}>
      {title}
    </Styled>
  );
};

export default Button;
