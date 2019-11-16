import React, { useContext, useEffect } from 'react';
import {
  CLEAR_MACROS_NUMBERS,
  CLEAR_FOOD_EDIT,
  EDIT_FOOD_SELECTED
} from '../../../Context/profile/profileTypes';
import ProfileContext from '../../../Context/profile/ProfileContext';
import useForm from '../../../Hooks/useForm';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../Ui/button/Button';
import AlertContext from '../../../Context/alert/AlertContext';

const ModalStyle = styled(Modal)`
  font-family: var(--primary--fn);

  .modal--title {
    font-size: 1.9rem;
    font-weight: bold;
    font-family: var(--primary--fn);
    color: var(--grey--clr);
  }

  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input,
    select {
      width: 120px;
      text-align: end;
    }
  }

  /* Nutrition */
  .nutrition {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0;

    &__stat {
      font-size: 1.2rem;
      text-align: center;
      &--subtitle {
        color: #e2aa00;
        font-size: 1rem;
        display: block;
      }

      .fat {
        color: #f92020;
      }
      .carbs {
        color: #2494ca;
      }
      .protein {
        color: #0abf0a;
      }
    }
  }
  /* Buttons */
  .modal--food--btns {
    display: flex;
    align-items: baseline;

    .btn + .btn {
      margin-left: 1em;
    }
  }
`;

const FoodModal = () => {
  const {
    modalShow,
    handleModal,
    setMeal,
    foodSelected,
    foodEdit,
    updateData,
    getFoodMacros,
    macroInfo,
    clearType
  } = useContext(ProfileContext);

  const { setAlert } = useContext(AlertContext);

  const submit = () => {
    if (meal === '-') return;

    // Split and join with "_"
    const mealName = meal
      .split(' ')
      .join('_')
      .toLowerCase();

    const mealSaved = {
      ...form,
      meal: mealName,
      ...foodSelected,
      ENERC_KCAL: chooseMacro('ENERC_KCAL').toString(),
      FAT: chooseMacro('FAT').toString(),
      CHOCDF: chooseMacro('CHOCDF').toString(),
      PROCNT: chooseMacro('PROCNT').toString()
    };

    if (foodEdit) {
      updateData(
        EDIT_FOOD_SELECTED,
        mealSaved,
        mealName,
        `/api/meal/${foodSelected._id}`
      );
      setAlert(`${foodSelected.label} updated from ${meal} `, 'success');
    } else {
      setMeal(mealSaved, mealName);
      setAlert(`${foodSelected.label} added to ${meal} `, 'success');
    }

    // Reset Form
    handleClose();
  };

  const { handleChange, handleSubmit, form, setForm } = useForm(
    { meal: '-', servings: '1', size: '-' },
    submit
  );

  const { meal, servings, size } = form;

  // Cheack what MacroInfo to use
  const chooseMacro = name => {
    if (size === '-') {
      return macroInfo.initalMacro[name];
    } else if (size !== '-') {
      return macroInfo.changeMacro && macroInfo.changeMacro[name];
    }
  };

  useEffect(() => {
    if (size === '-') {
      clearType(CLEAR_MACROS_NUMBERS);
    } else if (size !== '-' || !foodSelected) {
      getFoodMacros(foodSelected.foodId, servings, size);
    }
    // eslint-disable-next-line
  }, [size, servings, foodSelected]);

  // Cheack if foodEdit is true to change form meal input value
  useEffect(() => {
    if (foodEdit) {
      setForm({
        meal:
          foodSelected.meal.charAt(0).toUpperCase() +
          foodSelected.meal
            .slice(1)
            .split('_')
            .join(' '),
        servings: foodSelected.servings,
        size: foodSelected.size
      });
    }
    // eslint-disable-next-line
  }, [foodEdit, foodSelected]);

  const handleClose = () => {
    handleModal();
    setForm({ meal: '-', servings: '1', size: '-' });
    clearType(CLEAR_FOOD_EDIT);
  };

  return (
    foodSelected && (
      <ModalStyle
        show={modalShow.modalFor === 'meal' && modalShow.show}
        onHide={handleClose}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <ModalStyle.Header closeButton>
          <h3 className='modal--title'>{foodSelected.label}</h3>
        </ModalStyle.Header>
        <ModalStyle.Body>
          <form className='form modal--food' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='meal'>Choose what meal to add</label>
              <select
                className='form-control'
                id='meal'
                onChange={handleChange}
                value={meal}
                name='meal'
                required
              >
                {foodEdit ? (
                  <option>
                    {foodSelected.meal.charAt(0).toUpperCase() +
                      foodSelected.meal
                        .slice(1)
                        .split('_')
                        .join(' ')}
                  </option>
                ) : (
                  <>
                    <option>-</option>
                    <option>Meal 1</option>
                    <option>Meal 2</option>
                    <option>Meal 3</option>
                    <option>Meal 4</option>
                    <option>Meal 5</option>
                    <option>Meal 6</option>
                  </>
                )}
              </select>
            </div>
            <div className='form-group serving'>
              <label htmlFor='servings'>Number of Servings</label>
              <input
                id='servings'
                name='servings'
                value={servings}
                onChange={handleChange}
                type='number'
                className='form-control'
                aria-describedby='servings'
              />
            </div>
            <div className='form-group size'>
              <label htmlFor='size'>Serving Size</label>
              <select
                className='form-control'
                id='size'
                name='size'
                onChange={handleChange}
                value={size}
                aria-describedby='size'
                required
              >
                <option>-</option>
                {foodSelected.measures.map(size => (
                  <option key={size.label}>{size.label}</option>
                ))}
              </select>
            </div>
            <div className='nutrition'>
              <div className='nutrition__stat'>
                {chooseMacro('ENERC_KCAL')}{' '}
                <span className='nutrition__stat--subtitle cal'>Cal</span>
              </div>
              <div className='nutrition__stat'>
                {chooseMacro('FAT')} g
                <span className='nutrition__stat--subtitle fat'>Fat</span>
              </div>
              <div className='nutrition__stat'>
                {chooseMacro('CHOCDF')} g
                <span className='nutrition__stat--subtitle carbs'>Carbs</span>
              </div>
              <div className='nutrition__stat'>
                {chooseMacro('PROCNT')} g
                <span className='nutrition__stat--subtitle protein'>
                  Protein
                </span>
              </div>
            </div>
            <div className='modal--food--btns'>
              <Button
                title={foodEdit ? 'Update' : 'Add'}
                type='submit'
                addClass='btn-block'
              />
              <Button
                onClick={handleClose}
                title='close'
                // type='submit'
                addClass='btn-block'
              />
            </div>
          </form>
        </ModalStyle.Body>
      </ModalStyle>
    )
  );
};

export default FoodModal;
