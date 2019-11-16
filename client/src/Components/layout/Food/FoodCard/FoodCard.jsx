import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../../Ui/button/Button';
import noFoodImg from '../../../../assets/img/icons/noFoodImg.png';

const Styled = styled.div`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  justify-items: center;
  text-align: center;
  width: 220px;
  margin: 0 auto;

  .food--card--img {
    display: ${props => (props.showImg ? 'block' : 'none')};
    cursor: pointer;
    width: 110px;
    transition: opacity, transform 0.3s ease-in-out;
    filter: var(--img--shadow);
    margin: 0 auto;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }

  .blur-img {
    background-color: #3e3e3e;
    filter: blur(2px);
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .food--card--content {
    width: 100%;
  }

  .food--card--content__macros--items {
    display: flex;
    justify-content: space-between;
    /* padding: 0.2em 15%; */
  }

  .food--card--content__title {
    position: relative;
    font-size: 2.1rem;
    font-family: var(--primary--fn);
    font-weight: bold;
    text-transform: capitalize;
    margin-top: 0.5em;
    padding-bottom: 0.3em;
    color: var(--grey--clr);

    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      width: 60px;
      margin: 0 auto;
      background-color: var(--primary--clr);
    }
  }

  .macro--name,
  .macro--number {
    color: var(--grey--clr);
    font-size: 1.3rem;
    font-weight: bold;
    font-family: var(--primary--fn);
  }

  .macro--number {
    color: var(--light--blue--clr);
    margin-left: 2.2em;
  }

  .btn {
    margin-top: 0.6em;
  }
`;

const FoodCard = ({ data, linkTo, handleModal, setFoodSelected }) => {
  const [loading, setLoading] = useState(false);

  const hanldeClick = () => {
    handleModal('meal');
    setFoodSelected(data);
  };

  return (
    <Styled className='food--card' showImg={loading}>
      <Link className='food--link' to={`${linkTo}`}>
        {!loading ? <div className='blur-img' /> : null}

        <img
          onLoad={() => setLoading(true)}
          className='food--card--img'
          src={data.image ? data.image : noFoodImg}
          alt={data.label}
        />
      </Link>
      <div className='food--card--content'>
        <h3 className='food--card--content__title'>{data.label}</h3>
        <div className='food--card--content__macros'>
          <div className='food--card--content__macros--items'>
            <span className='macro--name'>Calories</span>
            <span className='macro--number'>{data.ENERC_KCAL}</span>
          </div>
          <div className='food--card--content__macros--items'>
            <span className='macro--name'>Fat</span>
            <span className='macro--number'>{data.FAT} g</span>
          </div>
          <div className='food--card--content__macros--items'>
            <span className='macro--name'>Carbs</span>
            <span className='macro--number'>{data.CHOCDF} g</span>
          </div>
          <div className='food--card--content__macros--items'>
            <span className='macro--name'>Protein</span>
            <span className='macro--number'>{data.PROCNT} g</span>
          </div>
        </div>
      </div>
      <Button onClick={hanldeClick} title='add food' />
    </Styled>
  );
};

export default FoodCard;
