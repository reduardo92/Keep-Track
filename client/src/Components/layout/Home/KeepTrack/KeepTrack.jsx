import React from 'react';
import styled from 'styled-components';
import Banner from '../../../Ui/banner/banner';
// meal imgs
import dairyLogo from '../.././../../assets/img/icons/clipboard.png';
import pizza from '../.././../../assets/img/icons/pizza.png';
import donut from '../.././../../assets/img/icons/donut.png';
import banana from '../.././../../assets/img/icons/banana.png';
import broccoli from '../.././../../assets/img/icons/broccoli.png';
// Macro imgs
import macroLogo from '../.././../../assets/img/icons/macroPie.png';
import nutritionLabel from '../.././../../assets/img/icons/nutritionLabel.png';
// Exercise imgs
import weightLogo from '../.././../../assets/img/icons/weight.png';
import runner from '../.././../../assets/img/icons/runner.png';
import liftperson from '../.././../../assets/img/icons/liftperson.png';
import bike from '../.././../../assets/img/icons/bike.png';
import yoga from '../.././../../assets/img/icons/yoga.png';

const Style = styled.div`
  padding-top: 4em;

  .keep--track--content__item,
  .keep--track--media__item {
    width: 100px;
    margin: 0 auto;
    filter: var(--img--shadow);
  }

  .keep--track--macros,
  .keep--track--exercise {
    padding-top: 4em;
    .keep--track--content__item,
    .keep--track--media__item {
      width: 130px;
    }
  }

  .banner {
    text-align: center;
    &--title {
      font-size: 1.8rem;
      /* color: var(--grey--clr); */
      padding: 0.5em 0 0.8em;
    }
  }

  .subtitle {
    color: var(--text--clr);
    margin-bottom: 1.5em;
    width: 350px;
    margin: 0 auto;
  }

  .keep--track--media {
    display: grid;
    padding-top: 3em;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    align-items: center;
  }

  @media screen and (min-width: 1024px) {
    /* Banner title */
    .banner {
      &--title {
        font-size: 2.1rem;
      }
    }

    /* Banner Subtitle */
    .subtitle {
      font-size: 1.13rem;
    }

    .keep--track--meals,
    .keep--track--macros,
    .keep--track--exercise {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    .keep--track--macros {
      .keep--track--content {
        order: 1;
        padding-left: 8em;
      }

      .keep--track--media {
        grid-template-columns: repeat(1, 1fr);

        &__item {
          margin-left: 6em;
        }
      }
    }

    .keep--track--media {
      grid-template-columns: repeat(2, minmax(150px, 1fr));
      &__item {
        width: 130px;
      }
    }
  }
`;

const KeepTrack = props => {
  return (
    <Style className='keep--track'>
      <div className='keep--track--meals'>
        <div className='keep--track--content'>
          <img
            src={dairyLogo}
            alt='fruit logo'
            className='keep--track--content__item'
          />
          <Banner
            title='Keep Track Of Your Meals'
            lineAfter
            titleClr='var(--grey--clr)'
            lineClr
          >
            <p className='subtitle'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
              aperiam animi atque exercitationem, nostrum veniam?
            </p>
          </Banner>
          {/* <LinkStyle to='/about'>View More</LinkStyle> */}
        </div>
        <div className='keep--track--media'>
          <img src={pizza} alt='pizza' className='keep--track--media__item' />
          <img
            src={broccoli}
            alt='broccoli'
            className='keep--track--media__item'
          />
          <img src={banana} alt='banana' className='keep--track--media__item' />
          <img src={donut} alt='donut' className='keep--track--media__item' />
        </div>
      </div>
      <div className='keep--track--macros'>
        <div className='keep--track--content'>
          <img
            src={macroLogo}
            alt='macro pie logo'
            className='keep--track--content__item'
          />
          <Banner
            title='Track Your Macros'
            lineAfter
            titleClr='var(--grey--clr)'
            lineClr
          >
            <p className='subtitle'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
              aperiam animi atque exercitationem, nostrum veniam?
            </p>
          </Banner>
          {/* <LinkStyle to='/about'>View More</LinkStyle> */}
        </div>
        <div className='keep--track--media'>
          <img
            src={nutritionLabel}
            alt='nutrition label'
            className='keep--track--media__item'
          />
        </div>
      </div>
      <div className='keep--track--exercise'>
        <div className='keep--track--content'>
          <img
            src={weightLogo}
            alt='macro pie logo'
            className='keep--track--content__item'
          />
          <Banner
            title='Log your Workouts'
            lineAfter
            titleClr='var(--grey--clr)'
            lineClr
          >
            <p className='subtitle'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
              aperiam animi atque exercitationem, nostrum veniam?
            </p>
          </Banner>
          {/* <LinkStyle to='/about'>View More</LinkStyle> */}
        </div>
        <div className='keep--track--media'>
          <img src={runner} alt='runner' className='keep--track--media__item' />
          <img
            src={liftperson}
            alt='lifter'
            className='keep--track--media__item'
          />
          <img src={bike} alt='bike' className='keep--track--media__item' />
          <img src={yoga} alt='yoga' className='keep--track--media__item' />
        </div>
      </div>
    </Style>
  );
};

export default KeepTrack;
