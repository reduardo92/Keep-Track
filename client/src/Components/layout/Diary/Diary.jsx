import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import cartoonCurl from '../../../assets/img/icons/cartoonCurl.png';
import DiaryInfo from './DiaryInfo';
import DiaryMeals from './DiaryMeals';
import Hero from '../../Ui/Hero/Hero';
import DiaryExerciseModal from './DiaryExerciseModal';
import AuthContext from '../../Context/auth/AuthContext';
import ProfileContext from '../../Context/profile/ProfileContext';

const Styled = styled.div`
  /* Container */
  .container {
    margin-top: 3em;
  }

  @media screen and (min-width: 1280px) {
    .container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 1em;
      margin-top: 0;
    }
    .diary--info {
      grid-column: 1 / 2;
      margin-top: 6em;
    }
    .diary--meals {
      grid-column: 2 / 7;
    }
  }
`;

const Diary = props => {
  const { loadUser } = useContext(AuthContext);
  const { getMacrosGoal, getExercises, getMeals } = useContext(ProfileContext);

  useEffect(() => {
    loadUser();
    // Load Meals
    getMeals();
    // Load N Get Macros Goals
    getMacrosGoal();
    // Load n get  exercises
    getExercises('/api/cardio', 'cardio');
    getExercises('/api/weights', 'weights');

    // eslint-disable-next-line
  }, []);

  return (
    <Styled className='diary'>
      <Hero
        heroGradient='var(--blue-linear--gradient--three)'
        title='Diary Tracker'
        subtitle='keep track on what you enjoy eating'
        linkToOne='setcalories'
        linkToTwo='food'
        linkOneName='Set Calories'
        linkTwoName='Search Food'
        img={cartoonCurl}
      />
      <div className='container'>
        <DiaryInfo />
        <DiaryMeals />
      </div>
      <DiaryExerciseModal />
    </Styled>
  );
};

export default Diary;
