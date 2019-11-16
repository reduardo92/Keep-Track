import React, { useContext, useEffect } from 'react';
import useForm from '../../Hooks/useForm';
import Banner from '../../Ui/banner/banner';
import Button from '../../Ui/button/Button';
import { StyledForm } from '../../Ui/FormsStyles/formstyle';
import AuthContext from '../../Context/auth/AuthContext';
import AlertContext from '../../Context/alert/AlertContext';

const SignUp = ({ history }) => {
  const { registerUser, isAuthentucated, error, clearErros } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthentucated) {
      history.push('/diary');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErros();
    }

    // eslint-disable-next-line
  }, [error, isAuthentucated, history]);

  const submit = () => {
    if (name === '' || email === '' || password === '') {
      setAlert('Please Fill all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords dont macth', 'danger');
    } else if (!error) {
      registerUser({
        name,
        email,
        password
      });
      setForm({
        name: '',
        email: '',
        password: '',
        password2: ''
      });
      setAlert('Thank you for signing up', 'success');
    }
  };

  const { handleChange, handleSubmit, form, setForm } = useForm(
    {
      name: '',
      email: '',
      password: '',
      password2: ''
    },
    submit
  );

  const { name, email, password, password2 } = form;

  return (
    <div className='container'>
      <StyledForm>
        <Banner
          title='Sign Up'
          subtitle='Take the step and join the team'
          lineAfter
          titleClr='var(--primary--clr)'
        />
        <form className='form login--from' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              name='name'
              value={name}
              onChange={handleChange}
              type='text'
              className='form-control'
              aria-describedby='name'
              placeholder='Enter name'
              // required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input
              id='email'
              name='email'
              value={email}
              onChange={handleChange}
              type='email'
              className='form-control'
              aria-describedby='emailHelp'
              placeholder='Enter email'
              // required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              value={password}
              onChange={handleChange}
              type='password'
              className='form-control'
              placeholder='Enter password'
              minLength='6'
              // required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm password</label>
            <input
              id='password2'
              name='password2'
              value={password2}
              onChange={handleChange}
              type='password'
              className='form-control'
              placeholder='Enter password again'
              // required
              minLength='6'
            />
          </div>
          <Button title='Submit' type='submit' addClass='btn-block' />
        </form>
      </StyledForm>
    </div>
  );
};

export default SignUp;
