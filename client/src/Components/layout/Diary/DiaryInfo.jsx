import React, { useContext } from 'react';
import styled from 'styled-components';
import { DELETE_EXERCISE } from '../../Context/profile/profileTypes';
import Banner from '../../Ui/banner/banner';
import ProfileContext from '../../Context/profile/ProfileContext';
import diaryInfoTotal from '../../Utility/diaryInfoTotal';
import Button from '../../Ui/button/Button';
import AlertContext from '../../Context/alert/AlertContext';

const Styled = styled.div`
  /* Cahnge Baner title size */
  .banner--title {
    font-size: 2.3rem;
    padding-bottom: 0.3em;
  }

  /* fire & weight icon */
  .fa-gripfire,
  .fa-dumbbell {
    color: #ff500d;
  }

  /* Calorie Side */
  .diary--info__calories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    text-align: center;

    .banner {
      grid-column: 1 / all;
    }
  }

  /* Group styles */
  .diary--info--group {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    &__title {
      font-family: var(--primary--fn);
      margin-bottom: 0em;
      font-weight: bold;
      font-size: 1.35rem;
      text-transform: capitalize;
    }

    &__number {
      margin-top: auto;
      font-size: 1.3rem;
      /* font-weight: bold; */
      color: var(--light--blue--clr);
      font-family: var(--primary--fn);
    }
  }

  /* Exercise Side */
  .diary--info__exercise {
    display: flex;
    flex-direction: column;

    .banner {
      text-align: center;
    }

    .diary--info--group {
      width: 100%;
      text-align: center;

      &__title {
        font-size: 1.2rem;
      }

      &__number {
        font-size: 1.26rem;
      }
    }
  }
  /* Edit Delete btns */
  .btns--groups {
    display: flex;
    flex: 100%;
    justify-content: space-evenly;
  }

  .btn--container {
    align-self: center;

    .btn {
      margin-top: 1.2em;
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

  .diary--info__exercise--stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    grid-gap: 0.5em;

    .exercise--title {
      position: relative;
      grid-column: 1 / all;
      color: var(--grey--clr);
      font-family: var(--primary--fn);
      font-weight: var(--bold--fn);
      font-size: 1.5rem;
      padding-bottom: 0.6em;

      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        right: 0;
        height: 5px;
        width: 60px;
        background-color: var(--primary--clr);
      }
    }
  }

  .diary--info__exercise--stats + .diary--info__exercise--stats {
    margin-top: 1.1em;
  }

  @media screen and (min-width: 764px) {
    .diary--info__calories {
      width: 90%;
      margin: 0 auto;
    }

    .diary--info__exercise {
      flex-direction: row;
      flex-wrap: wrap;

      /* exercises banner */
      .banner {
        flex: 100%;
      }
    }

    .cardio {
      margin-top: 1.1em;
    }

    .diary--info__exercise--stats {
      flex: 1;

      .exercise--title {
        justify-self: center;
        align-self: center;
        &::after {
          margin: 0 auto;
        }
      }
    }

    .btn--container {
      flex: 100%;
      display: flex;
      justify-content: center;
    }
  }

  @media screen and (min-width: 1280px) {
    /* Cahnge Baner title size */
    .banner--title {
      font-size: 2.7rem;
      padding-bottom: 0.3em;
    }

    .diary--info__exercise,
    .diary--info__calories {
      width: 100%;
    }

    /* Calories */
    .diary--info__calories {
      margin-bottom: 4em;
    }

    .diary--info--group {
      margin: 0.5em 0;
      grid-column: 1 / all;
      flex-direction: row;
      justify-content: space-evenly;
      width: 80%;

      &__title {
        flex: 100%;
        font-size: 1.55rem;
      }

      &__number {
        font-size: 1.5rem;
      }
    }

    /* Exercise */
    .diary--info__exercise {
      flex-direction: column;

      .diary--info--group {
        width: 100%;
        text-align: center;

        &__title {
          font-size: 1.25rem;
        }

        &__number {
          font-size: 1.4rem;
        }
      }
    }
  }
`;

const DiaryInfo = () => {
  const {
    macrosGoals,
    meals,
    exercises,
    handleModal,
    hanldeDelete,
    getExerciseEdit,
    loading
  } = useContext(ProfileContext);

  const { setAlert } = useContext(AlertContext);

  const macro = name => (macrosGoals ? macrosGoals[name] : '0');

  const handleEdit = item => {
    handleModal('exercise');
    getExerciseEdit(item);
  };

  const setDelete = ({ _id, exercise, name }) => {
    hanldeDelete(DELETE_EXERCISE, _id, exercise, `/api/${exercise}/${_id}`);
    setAlert(`${name} removed`, 'success');
  };

  return (
    exercises.cardio &&
    exercises.weights &&
    !loading && (
      <Styled className='diary--info'>
        <div className='diary--info__calories'>
          <Banner title='Macros' titleClr='var(--primary--clr)' lineAfter />
          <div className='diary--info--group'>
            <p className='diary--info--group__title'>Calories</p>
            <span className='diary--info--group__number'>
              {macro('calories')}
            </span>
            <span className='diary--info--group__number'>-</span>
            <span className='diary--info--group__number'>
              {diaryInfoTotal('ENERC_KCAL', meals)}
            </span>
          </div>
          <div className='diary--info--group'>
            <p className='diary--info--group__title'>Fat</p>
            <span className='diary--info--group__number'>{macro('fat')}</span>
            <span className='diary--info--group__number'>-</span>
            <span className='diary--info--group__number'>
              {diaryInfoTotal('FAT', meals)}
            </span>
          </div>
          <div className='diary--info--group'>
            <p className='diary--info--group__title'>Carbs</p>
            <span className='diary--info--group__number'>{macro('carbs')}</span>
            <span className='diary--info--group__number'>-</span>
            <span className='diary--info--group__number'>
              {diaryInfoTotal('CHOCDF', meals)}
            </span>
          </div>
          <div className='diary--info--group'>
            <p className='diary--info--group__title'>Protein</p>
            <span className='diary--info--group__number'>
              {macro('protein')}
            </span>
            <span className='diary--info--group__number'>-</span>
            <span className='diary--info--group__number'>
              {diaryInfoTotal('PROCNT', meals)}
            </span>
          </div>
        </div>
        <div className='diary--info__exercise'>
          <Banner title='Exercises' titleClr='var(--primary--clr)' lineAfter />
          <div className='diary--info__exercise--stats cardio'>
            <h3 className='exercise--title'>Cardio</h3>
            {exercises.cardio.map(item => (
              <div key={item._id} className='diary--info--group'>
                <p className='diary--info--group__title'>{item.name}</p>
                <span className='diary--info--group__number'>
                  {item.time} min
                </span>
                <span className='diary--info--group__number'>
                  {item.calories} <i className='fab fa-gripfire'></i>
                </span>
                <div className='btns--groups'>
                  <i
                    onClick={() => handleEdit(item)}
                    className='far fa-plus-square'
                  ></i>
                  <i
                    onClick={() => setDelete(item)}
                    className='fas fa-minus-circle'
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className='diary--info__exercise--stats weights'>
            <h3 className='exercise--title'>Weights</h3>
            {exercises.weights.map(item => (
              <div key={item._id} className='diary--info--group'>
                <p className='diary--info--group__title'>{item.name}</p>
                <span className='diary--info--group__number'>
                  {' '}
                  {item.sets} x {item.reps}
                </span>
                <span className='diary--info--group__number'>
                  {item.weight} <i className='fas fa-dumbbell'></i>
                </span>
                <div className='btns--groups'>
                  <i
                    onClick={() => handleEdit(item)}
                    className='far fa-plus-square'
                  ></i>
                  <i
                    onClick={() => setDelete(item)}
                    className='fas fa-minus-circle'
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className='btn--container'>
            <Button
              onClick={() => handleModal('exercise')}
              title='Add Exercise'
            />
          </div>
        </div>
      </Styled>
    )
  );
};

export default DiaryInfo;

// flex: 100%;
// display: flex;
// justify-content: space-evenly;
