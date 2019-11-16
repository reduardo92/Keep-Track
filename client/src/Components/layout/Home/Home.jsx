import React from 'react';
import styled from 'styled-components';
import KeepTrack from './KeepTrack/KeepTrack';
import Hero from '../../Ui/Hero/Hero';
import Scale from '../../../assets/img/scale.png';
import FontAwesome from '../../Ui/FontAwesome/FontAwesome';

const Styled = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 500px;
  margin: 0 auto;

  .icon {
    color: var(--third--clr);
    font-size: 1.5rem;
    filter: drop-shadow(0 10px 6px rgba(0, 0, 0, 0.5));
    margin-bottom: 0.3em;
  }

  .check-mark {
    span {
      display: block;
      font-family: var(--primary--fn);
    }
  }

  @media screen and (min-width: 1024px) {
    /* Hero Sub Title Check Marks */
    .icon {
      font-size: 2.2rem;
    }

    .check-mark {
      span {
        font-size: 1.2rem;
      }
    }
  }
`;

const Home = props => {
  return (
    <section className='home'>
      <Hero
        heroGradient='var(--blue-linear--gradient)'
        title='Living Healthy'
        subtitle='Lets Us Help You Keep On Track'
        linkToOne='signup'
        linkToTwo='login'
        linkOneName='Sign Up'
        linkTwoName='Log In'
        img={Scale}
        heroImgSize='250px'
        heroImgSizeMd='350px'
        heroImgSizeLg='350px'
      >
        <Styled className='hero--tille_subs'>
          <div className='check-mark'>
            <FontAwesome font='fas fa-check' clr='var(--third--clr)' noHover />
            <span>Eat Better</span>
          </div>
          <div className='check-mark'>
            <FontAwesome font='fas fa-check' clr='var(--third--clr)' noHover />
            <span>Keep Track</span>
          </div>
          <div className='check-mark'>
            <FontAwesome font='fas fa-check' clr='var(--third--clr)' noHover />
            <span>Lose Weight</span>
          </div>
        </Styled>
      </Hero>
      <div className='container'>
        <KeepTrack />
      </div>
    </section>
  );
};

export default Home;
