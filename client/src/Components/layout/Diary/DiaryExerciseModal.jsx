import React, { useContext, useEffect } from 'react';
import ProfileContext from '../../Context/profile/ProfileContext';
import {
  EDIT_EXERCISE,
  CLEAR_EDIT_EXERCISE
} from '../../Context/profile/profileTypes';
import ModalStyle from '../../Ui/VerticalModal/ModalStyle';
import useForm from '../../Hooks/useForm';
import Button from '../../Ui/button/Button';
import AlertContext from '../../Context/alert/AlertContext';

const DiaryExerciseModal = () => {
  const {
    modalShow,
    handleModal,
    exercisesEdit,
    updateData,
    setExercises,
    clearType
  } = useContext(ProfileContext);
  const { setAlert } = useContext(AlertContext);

  const submit = () => {
    if (exercisesEdit) {
      const newExerciseData =
        exercisesEdit.exercise === 'cardio'
          ? {
              _id: exercisesEdit._id,
              exercise: 'cardio',
              name: name,
              time: time,
              calories: calories
            }
          : {
              _id: exercisesEdit._id,
              exercise: 'weights',
              name: name,
              sets: sets,
              reps: reps,
              weight: weight
            };
      updateData(
        EDIT_EXERCISE,
        newExerciseData,
        exercisesEdit.exercise,
        `/api/${exercisesEdit.exercise}/${exercisesEdit._id}`
      );

      clearType(CLEAR_EDIT_EXERCISE);
      setAlert(`${exercisesEdit.name} updated`, 'success');
    } else {
      if (exercise === 'cardio') {
        setExercises(
          {
            exercise: 'cardio',
            name,
            time,
            calories
          },
          'cardio'
        );
        setAlert(`${name} add to Cardio`, 'success');
      } else if (exercise === 'weights') {
        setExercises(
          {
            exercise: 'weights',
            name,
            sets,
            reps,
            weight
          },
          'weights'
        );
        setAlert(`${name} add to Weights`, 'success');
      }
      console.log('no edit', form);
    }

    // CLOSE MODAL
    handleModal();
    // RESET FORM
    setForm({
      exercise: 'cardio',
      name: '',
      time: '',
      calories: '',
      sets: '',
      reps: '',
      weight: ''
    });
  };

  const { handleChange, handleSubmit, form, setForm } = useForm(
    {
      exercise: 'cardio',
      name: '',
      time: '',
      calories: '',
      sets: '',
      reps: '',
      weight: ''
    },
    submit
  );

  const { exercise, name, time, calories, sets, reps, weight } = form;

  useEffect(() => {
    if (exercisesEdit) {
      setForm(exercisesEdit);
    }
    // eslint-disable-next-line
  }, [exercisesEdit]);

  return (
    <ModalStyle
      show={modalShow.modalFor === 'exercise' && modalShow.show}
      onHide={handleModal}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <ModalStyle.Header closeButton>
        <h3 className='modal--title'>Add Exercise</h3>
      </ModalStyle.Header>
      <ModalStyle.Body>
        <form className='form modal--food' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='exercise'>Choose Exercise</label>
            <select
              className='form-control'
              id='exercise'
              onChange={handleChange}
              value={exercise}
              name='exercise'
              required
            >
              <option>cardio</option>
              <option>weights</option>
            </select>
          </div>
          <div className='form-group name'>
            <label htmlFor='name'>
              {exercise === 'cardio' ? 'Cardio' : 'Lift'} name
            </label>
            <input
              id='name'
              name='name'
              value={name}
              onChange={handleChange}
              type='text'
              className='form-control'
              aria-describedby='name'
              required
            />
          </div>
          {/* CARDIO iNPUTS */}
          {exercise === 'cardio' && (
            <>
              <div className='form-group time'>
                <label htmlFor='time'>Time</label>
                <input
                  id='time'
                  name='time'
                  value={time}
                  onChange={handleChange}
                  type='number'
                  className='form-control'
                  aria-describedby='time'
                  required
                />
              </div>
              <div className='form-group calories'>
                <label htmlFor='calories'>Calories Burn</label>
                <input
                  id='calories'
                  name='calories'
                  value={calories}
                  onChange={handleChange}
                  type='number'
                  className='form-control'
                  aria-describedby='calories'
                  required
                />
              </div>
            </>
          )}
          {/* WEIGHTS iNPUTS */}
          {exercise === 'weights' && (
            <>
              <div className='form-group sets'>
                <label htmlFor='sets'>Sets</label>
                <input
                  id='sets'
                  name='sets'
                  value={sets}
                  onChange={handleChange}
                  type='number'
                  className='form-control'
                  aria-describedby='sets'
                  required
                />
              </div>
              <div className='form-group reps'>
                <label htmlFor='reps'>Reps</label>
                <input
                  id='reps'
                  name='reps'
                  value={reps}
                  onChange={handleChange}
                  type='number'
                  className='form-control'
                  aria-describedby='reps'
                  required
                />
              </div>
              <div className='form-group weight'>
                <label htmlFor='weight'>Weight</label>
                <input
                  id='weight'
                  name='weight'
                  value={weight}
                  onChange={handleChange}
                  type='number'
                  className='form-control'
                  aria-describedby='weight'
                  required
                />
              </div>
            </>
          )}

          <div className='modal--food--btns'>
            <Button title='Add' type='submit' addClass='btn-block' />
            <Button onClick={handleModal} title='close' addClass='btn-block' />
          </div>
        </form>
      </ModalStyle.Body>
    </ModalStyle>
  );
};

export default DiaryExerciseModal;
