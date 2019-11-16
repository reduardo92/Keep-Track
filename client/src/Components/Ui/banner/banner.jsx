import React from 'react';
import styled from 'styled-components';
// import withReveal from 'react-reveal/withReveal';
// import Fade from 'react-reveal/Fade';

const Bannerstyle = styled.div`
  color: var(--white--clr);
  .banner--title {
    color: ${props => props.titleClr || 'var(--white--clr)'};
    position: relative;
    font-size: 3.1rem;
    font-family: var(--primary--fn);
    font-weight: var(--bold--fn);

    &::after {
      ${props =>
        props.lineAfter &&
        `position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 8px;
        width: 60px;
        `}
        background-color: ${props =>
          props.lineClr ? 'var(--light--blue--clr)' : 'var(--third--clr)'};
    }
  }

  .banner--subtitle {
    color: ${props =>
      props.subtitleClr ? 'var(--text--clr)' : 'var(--white--clr)'};
    font-size: 1.18em;
    margin-bottom: 1em;
    font-family: ${props => props.fontFn && 'var(--primary--fn);'};
  }

  @media screen and (min-width: 1024px) {
    /* Banner Title */
    .banner {
      &--title {
        font-size: 4rem;
      }
      &--subtitle {
        font-size: 1.4rem;
      }
    }
  }
`;
const Banner = ({
  children,
  title,
  subtitle,
  lineAfter,
  titleClr,
  subtitleClr,
  fontFn,
  lineClr
}) => (
  <Bannerstyle
    className='banner'
    lineAfter={lineAfter}
    titleClr={titleClr}
    subtitleClr={subtitleClr}
    fontFn={fontFn}
    lineClr={lineClr}
  >
    <h1 className='banner--title'>{title}</h1>
    {subtitle && <p className='banner--subtitle'>{subtitle}</p>}
    {children}
  </Bannerstyle>
);

export default Banner;
