import React, { useContext } from 'react';
import styled from 'styled-components';
import MealTable from './MealTable';
import ProfileContext from '../../Context/profile/ProfileContext';

const Styled = styled.div`
  /* Table Container */
  .table--container {
    display: flex;
    flex-direction: column;

    .btn {
      font-size: 1rem;
      align-self: flex-start;
      color: var(--white--clr);
      background: var(--primary--clr);
      border-radius: 10px;
    }
  }

  .table--container + .table--container {
    margin-top: 2em;
  }

  /* Tabel */
  .table--head {
    background-color: var(--third--clr);
    color: var(--grey--clr);
    box-shadow: 0px 1px 3px #0000001f;

    &--th {
      font-family: var(--primary--fn);
      text-align: center;
    }
  }

  .table--tbody {
    text-align: center;

    &--th {
      font-family: var(--primary--fn);
      padding: 0.5rem 0 0;
      text-align: center;
      vertical-align: middle;
    }
  }

  /* remove icon */
  .fa-minus-circle,
  .fa-plus-square {
    color: red;
    font-size: 1.1rem;
    transition: var(--ease--in--out--02s);
    transform: rotate(0);
    cursor: pointer;

    &:hover,
    &:focus {
      transform: rotate(-360deg);
      color: var(--grey--clr);
    }
  }

  /* Edit Icon */
  .fa-plus-square {
    color: var(--grey--clr);
    &:hover,
    &:focus {
      color: var(--primary--clr);
    }
  }

  /* food Img */
  .meal--img {
    width: 40px;
    margin: 0 auto;
  }

  /* food name */
  .meal--name {
    font-size: 1rem;
    margin-bottom: 0;
  }

  /* Table Total */
  .total {
    background-color: var(--grey--clr);

    .table--tbody--th {
      color: var(--primary--clr);
      font-weight: bold;
      font-family: var(--primary--fn);
      padding: 0.5em 0;
    }

    .total--text {
      font-size: 1.15rem;
      color: var(--primary--clr);
      margin-bottom: 0;
    }
  }

  .th-head {
    width: 26%;
  }

  @media screen and (min-width: 764px) {
    .table--head {
      &--th {
        font-size: 1.15rem;
      }
    }

    .table--tbody {
      &--th {
        font-size: 1.1rem;
      }
    }
  }
  @media screen and (min-width: 1280px) {
    /* Table Container */
    .table--container {
      .btn {
        align-self: flex-end;
        font-size: 1.2rem;
      }
    }

    .table--head {
      &--th {
        font-size: 1.2rem;
      }
    }

    .table--tbody {
      &--th {
        font-size: 1.25rem;
      }
    }

    .fa-minus-circle {
      font-size: 1.3rem;
    }
  }
`;

const Meal = () => {
  const {
    meals: { meal_1, meal_2, meal_3, meal_4, meal_5, meal_6 },
    loading
  } = useContext(ProfileContext);
  return (
    !loading && (
      <Styled className='meals--container'>
        <MealTable numberMeal='1' meal={meal_1} />
        <MealTable numberMeal='2' meal={meal_2} />
        <MealTable numberMeal='3' meal={meal_3} />
        <MealTable numberMeal='4' meal={meal_4} />
        <MealTable numberMeal='5' meal={meal_5} />
        <MealTable numberMeal='6' meal={meal_6} />
      </Styled>
    )
  );
};

export default Meal;
