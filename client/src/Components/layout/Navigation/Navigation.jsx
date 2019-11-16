import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/auth/AuthContext';
import ProfileContext from '../../Context/profile/ProfileContext';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { RESET_ALL } from '../../Context/profile/profileTypes';
import Logo from '../../../assets/img/keep-track-logo.png';

const Styled = styled.header`
  position: fixed;
  background: ${props =>
    props.headerBg || props.logSign ? 'var(--blue-linear--gradient)' : ''};
  top: 0;
  left: 0;
  right: 0;
  z-index: 6;
  transition: background-color 5s ease-in-out;

  .logo {
    /* position: fixed; */
    z-index: 5;
    width: 125px;
    display: inline-block;
    margin-top: 15px;
    margin-left: 10px;
    font-size: 2rem;

    img {
      filter: var(--img--shadow);
    }
  }

  .burger-toggle {
    position: ${props => (props.toggle ? 'fixed' : 'absolute')};
    z-index: 5;
    background-color: transparent;
    border: none;
    top: 20px;
    right: 10px;
    padding: 1em;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);

    .line {
      transition: var(--ease--in--out--05s);
      width: 28px;
      height: 3px;
      margin: 5px 0;
      background-color: ${props =>
        props.toggle ? 'var(--hover--clr)' : 'var(--white--clr)'};
    }

    .line_one {
      transform: ${props =>
        props.toggle ? 'rotate(45deg) translate(5px, 5px)' : ''};
    }
    .line_two {
      opacity: ${props => (props.toggle ? 0 : '')};
    }
    .line_three {
      transform: ${props =>
        props.toggle ? 'rotate(-45deg) translate(7px, -6px)' : ''};
    }
  }

  .nav-links {
    background-color: var(--primary--clr);
    transition: var(--ease--in--out--07s);
    transform: ${props =>
      props.toggle ? 'translateX(0)' : 'translateX(110%)'};
    position: fixed;
    padding: 4em 0 2em;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;

    .nav-links_item {
      cursor: pointer;
      color: var(--white--clr);
      text-shadow: 0px 5px 8px rgba(0, 0, 0, 0.185);
      font-size: 1.6rem;
      font-family: var(--primary--fn);
      font-weight: bold;
      text-transform: uppercase;
      transition: ${props =>
        props.toggle ? 'all  0.2s ease-in' : 'all 0.5s ease-in-out'};
      opacity: ${props => (!props.toggle ? 0 : 1)};
      text-align: center;

      &:hover,
      &:focus,
      &.active {
        color: var(--third--clr);
      }
    }
  }

  @media screen and (min-width: 1020px) {
    .header-nav {
      position: absolute;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 0;
      margin-top: 1em;
      max-width: 1800px;
      background-color: transparent;
    }

    .nav-links {
      position: relative;
      display: block;
      background-color: transparent;
      width: 100%;
      transform: translateX(0);
      padding-top: 1.5em;
      padding-right: 2em;
      text-align: end;

      .nav-links_item {
        font-size: 1.25rem;
        opacity: 1;
        padding: 0;
        color: var(--white--clr);
      }
      .nav-links_item + .nav-links_item {
        margin-left: 3em;
      }
    }

    .logo {
      position: absolute;
      margin-top: 0;
      margin-left: 40px;
    }

    .burger-toggle {
      display: none;
    }
  }
`;

const Navigation = props => {
  const { isAuthentucated, logout } = useContext(AuthContext);
  const { clearType, navRef } = useContext(ProfileContext);
  const [toggle, setToggle] = useState(false);

  const [bg, setBg] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change Nav color on hero bottom postion
  useEffect(
    () =>
      window.addEventListener('scroll', () => {
        if (
          window.scrollY >
          navRef.current.nextSibling.childNodes[0].offsetHeight - 120
        ) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }),
    [navRef]
  );

  // change Nav color when url is login or signup
  useEffect(
    () =>
      window.location.pathname === '/login' ||
      window.location.pathname === '/signup'
        ? setBg(true)
        : setBg(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location.pathname]
  );

  const handleLogOut = () => {
    setToggle(!toggle);
    logout();
    clearType(RESET_ALL);
  };

  const logIn = (
    <>
      <NavLink
        onClick={() => setToggle(!toggle)}
        to='/diary'
        className='nav-links_item'
      >
        Diary
      </NavLink>
      <NavLink
        onClick={() => setToggle(!toggle)}
        to='/setcalories'
        className='nav-links_item'
      >
        Set Calories
      </NavLink>
      <NavLink
        onClick={() => setToggle(!toggle)}
        to='/food'
        className='nav-links_item'
      >
        Food
      </NavLink>
      <NavLink onClick={handleLogOut} to='/home' className='nav-links_item'>
        <i className='fas fa-sign-out-alt'></i>{' '}
        <span className='hide-sm'>Log out</span>
      </NavLink>
    </>
  );

  const logOut = (
    <>
      <NavLink
        onClick={() => setToggle(!toggle)}
        to='/home'
        className='nav-links_item'
      >
        Home
      </NavLink>

      <NavLink
        onClick={() => setToggle(!toggle)}
        to='/login'
        className='nav-links_item'
      >
        Login
      </NavLink>
      <NavLink
        onClick={() => setToggle(!toggle)}
        to='/signup'
        className='nav-links_item'
      >
        Signup
      </NavLink>
    </>
  );
  return (
    <Styled
      ref={navRef}
      logSign={bg}
      headerBg={scrolled}
      className={`header-nav`}
      toggle={toggle}
    >
      <div className='container'>
        <Link to={isAuthentucated ? '/diary' : '/home'} className='logo'>
          <img src={Logo} alt='logo' />
        </Link>

        <button
          onClick={() => setToggle(!toggle)}
          className={`burger-toggle ${toggle ? 'toggle' : ''}`}
        >
          <div className='line line_one' />
          <div className='line line_two' />
          <div className='line line_three' />
        </button>

        <nav className='nav-links'>{isAuthentucated ? logIn : logOut}</nav>
      </div>
    </Styled>
  );
};

export default Navigation;
