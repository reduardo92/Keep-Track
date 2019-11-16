import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../../assets/img/keep-track-logo.png';
import FontAwesome from '../../Ui/FontAwesome/FontAwesome';

const FooterStyle = styled.footer`
  width: 100%;
  min-height: 25vh;
  margin-top: 2em;
  padding: 1.5em 0 0.6em;
  text-align: center;
  color: var(--white--clr);
  background: var(--blue-linear--gradient);

  .logo {
    display: block;
    width: 125px;
    margin: 0 auto;
  }

  p {
    padding-bottom: 0.4em;
  }

  .social {
    padding: 1em;
    .fab {
      height: 36px;
      width: 36px;
      border: 2px solid #fff;
      color: var(--white--clr);
      border-radius: 22px;
      line-height: 33px;
      font-size: 18px;

      &:hover,
      &:focus {
        color: var(--hover--clr);
        border-color: var(--hover--clr);
      }
    }

    .fab + .fab {
      margin-left: 1.5em;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <Link to='/' className='logo'>
        <img src={Logo} alt='logo' />
      </Link>
      <div className='social'>
        <FontAwesome font='fab fa-instagram' clr='var(--white--clr)' />
        <FontAwesome font='fab fa-twitter' clr='var(--white--clr)' />
        <FontAwesome font='fab fa-facebook' clr='var(--white--clr)' />
        <FontAwesome font='fab fa-pinterest' clr='var(--white--clr)' />
      </div>
      <p>
        <small>© Copyright 2019 Keep Track, Inc. All Rights Reserved</small>
      </p>
    </FooterStyle>
  );
};

export default Footer;
