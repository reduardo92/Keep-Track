import React from 'react';
import styled from 'styled-components';
import Meal from './Meal';
import getDate from '../../Utility/getDate';

const Styled = styled.section`
  margin-top: 3em;
  /* Meal time  */
  .meal--date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--primary--fn);
    font-weight: bold;
    max-width: 300px;
    margin: 0 auto 1em;
    text-align: center;

    /* Button */
    &--btn {
      font-size: 1.3rem;
      padding: 1.4px 8px;
      border: none;
      border-radius: 10px 0 0 10px;
      background: var(--blue-linear--gradient--two);
      color: var(--white--clr);
      transition: var(--ease--in--out--02s);
      transform: scale(1);

      &:hover,
      &:focus {
        transform: scale(0.95);
        color: var(--third--clr);
      }
    }

    .next {
      border-radius: 0 10px 10px 0;
    }

    /* Date  */
    &--date {
      color: var(--white--clr);
      background: var(--blue-linear--gradient--two);
      padding: 0em 0.38em;
      border-radius: 5px;
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 1280px) {
    .meal--date {
      max-width: 330px;
      /* Button */
      &--date {
        font-size: 1.8rem;
        padding: 0 5px;
      }

      /* BTN  */
      &--btn {
        font-size: 1.5rem;
        padding: 3.2px 8px;
      }
    }
  }
`;

const DiaryMeals = () => (
  <Styled className='diary--meals'>
    <div className='meal--date'>
      <button className='meal--date--btn prev'>
        <i className='fas fa-chevron-left'></i>
      </button>
      <div className='meal--date--date'>{getDate()}</div>
      <button className='meal--date--btn next'>
        <i className='fas fa-chevron-right'></i>
      </button>
    </div>
    {/* Meal Table */}
    <Meal />
    {/* Meal Table */}
  </Styled>
);

export default DiaryMeals;
