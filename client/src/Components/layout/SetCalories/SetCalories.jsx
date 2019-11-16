import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import personimg from '../../../assets/img/icons/scaleMan.png';
import CalculatorForm from './CalculatorForm';
import Hero from '../../Ui/Hero/Hero';
import AuthContext from '../../Context/auth/AuthContext';

const Styled = styled.div`
  .dairy--calculator {
    margin-top: 3em;
  }
`;

const SetCalories = props => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);
  return (
    <Styled className='diary'>
      <Hero
        heroGradient='var(--blue-linear--gradient--two)'
        title='Calories Goals'
        subtitle='Keeping yourself on track'
        linkToOne='diary'
        linkToTwo='food'
        linkOneName='Go To Diary'
        linkTwoName='Search Food'
        img={personimg}
      />

      <div className='container'>
        <CalculatorForm />
      </div>
    </Styled>
  );
};

export default SetCalories;
