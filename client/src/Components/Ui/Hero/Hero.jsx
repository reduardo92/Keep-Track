import React from 'react';
import styled from 'styled-components';
import HeroBg from '../HeroBg/HeroBg';
import Banner from '../banner/banner';
import { LinkStyle } from '../button/Button';

const Styled = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  /* Hero */
  .hero--img {
    z-index: 5;
    margin-top: -150px;
    width: ${props => props.heroImgSize || '120px'};
  }

  .hero--group-btn {
    display: flex;
    justify-content: center;
    margin-top: 1em;
  }

  .hero-btn + .hero-btn {
    margin-left: 1em;
  }

  /* Container */
  .container {
    margin-top: 3em;
  }

  @media screen and (min-width: 764px) {
    /* Person Img */
    .hero--img {
      width: ${props => props.heroImgSizeMd || '140px'};
    }
  }

  @media screen and (min-width: 1024px) {
    /* Person Img */
    .hero--img {
      width: ${props => props.heroImgSizeLg || '160px'};
    }
  }
`;

const Hero = ({
  heroGradient = 'var(--blue-linear--gradient)',
  title,
  subtitle,
  linkToOne,
  linkToTwo,
  linkOneName,
  linkTwoName,
  img,
  heroImgSize,
  heroImgSizeMd,
  heroImgSizeLg,
  children
}) => {
  return (
    <Styled
      className='hero'
      heroImgSize={heroImgSize}
      heroImgSizeMd={heroImgSizeMd}
      heroImgSizeLg={heroImgSizeLg}
    >
      <HeroBg linearBg={heroGradient}>
        <Banner title={title} subtitle={subtitle} fontFn>
          {children}
          <div className='hero--group-btn'>
            <LinkStyle className='hero-btn' to={`/${linkToOne}`}>
              {linkOneName}
            </LinkStyle>
            <LinkStyle className='hero-btn' to={`/${linkToTwo}`}>
              {linkTwoName}
            </LinkStyle>
          </div>
        </Banner>
      </HeroBg>
      <div className='hero--img'>
        <img src={img} alt='hero img' />
      </div>
    </Styled>
  );
};

export default Hero;
