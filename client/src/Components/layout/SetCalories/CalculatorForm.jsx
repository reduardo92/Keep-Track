import React, { useEffect, useContext } from 'react';
import Button from '../../Ui/button/Button';
import { StyledForm } from '../../Ui/FormsStyles/formstyle';
import useForm from '../../Hooks/useForm';
import Banner from '../../Ui/banner/banner';
import styled from 'styled-components';
import ProfileContext from '../../Context/profile/ProfileContext';
import AlertContext from '../../Context/alert/AlertContext';

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 10px solid #e1e1e1;
  text-align: center;
  height: 65px;
  color: var(--primary--clr);
  font-family: var(--primary--fn);

  .calories--number {
    font-size: 3rem;
  }
`;

const CalculatorForm = () => {
  // Profile Context
  const { setMacrosGoal, getMacrosGoal, macrosGoals } = useContext(
    ProfileContext
  );
  const { setAlert } = useContext(AlertContext);
  // Sumit Macros
  const submit = () => {
    if (macrosGoals) {
      setMacrosGoal({ ...form, calories, _id: macrosGoals._id });
    } else {
      setMacrosGoal({ ...form, calories });
    }
    setAlert(`Calories Set`, 'success');
  };

  // Use From fucntion
  const { handleChange, handleSubmit, form, setForm } = useForm(
    {
      fat: '',
      carbs: '',
      protein: ''
    },
    submit
  );

  // Load Macros
  useEffect(() => {
    getMacrosGoal();
    // eslint-disable-next-line
  }, []);

  // Cheack if macros Goasl has information
  useEffect(() => {
    if (!macrosGoals) {
      setForm({
        fat: '',
        carbs: '',
        protein: ''
      });
    } else {
      setForm({
        fat: macrosGoals.fat,
        carbs: macrosGoals.carbs,
        protein: macrosGoals.protein
      });
    }
  }, [macrosGoals, setForm]);

  // Change Calories base on fat,carbs,protein
  const calories = JSON.stringify(
    form.fat * 9 + form.carbs * 4 + form.protein * 4
  );
  return (
    <StyledForm className='dairy--calculator'>
      <Banner
        title='Set your goals'
        subtitle='your calories change automatically when you set your macros'
        titleClr='var(--grey--clr)'
        lineAfter
      />

      <form className='form login--from' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Calories Goals</label>
          <Styled className='calories'>
            <h3 className='calories--number'>{calories}</h3>
          </Styled>
        </div>
        <div className='form-group'>
          <label htmlFor='fat'>Fat</label>
          <input
            id='fat'
            name='fat'
            value={form.fat}
            onChange={handleChange}
            type='text'
            className='form-control'
            placeholder='Enter fat'
            aria-describedby='fat'
            maxLength='3'
            required
          />
          <small className='form-text text-muted'>
            One gram of fat equals 9 calories
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='carbs'>Carbs</label>
          <input
            id='carbs'
            name='carbs'
            value={form.carbs}
            onChange={handleChange}
            type='text'
            className='form-control'
            placeholder='Enter carbs'
            aria-describedby='carbs'
            maxLength='3'
            required
          />
          <small className='form-text text-muted'>
            One gram of carbs equals 4 calories
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='protein'>Protein</label>
          <input
            id='protein'
            name='protein'
            value={form.protein}
            onChange={handleChange}
            type='text'
            className='form-control'
            placeholder='Enter protein'
            aria-describedby='protein'
            maxLength='3'
            required
          />
          <small className='form-text text-muted'>
            One gram of protein equals 4 calories
          </small>
        </div>
        <Button title='Enter' type='submit' addClass='btn-block' />
      </form>
    </StyledForm>
  );
};

export default CalculatorForm;
