import React, { useEffect, useContext } from 'react';
import useForm from '../../Hooks/useForm';
import Button from '../../Ui/button/Button';
import Banner from '../../Ui/banner/banner';
import { StyledForm } from '../../Ui/FormsStyles/formstyle';
import AuthContext from '../../Context/auth/AuthContext';
import AlertContext from '../../Context/alert/AlertContext';

const Login = ({ history }) => {
  const { loginUser, isAuthentucated, error, clearErros } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthentucated) {
      history.push('/diary');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErros();
    }

    // eslint-disable-next-line
  }, [error, isAuthentucated, history]);

  const submit = () => {
    if (email === '' || password === '') {
      setAlert('Please Fill all fields', 'danger');
    } else if (!error) {
      loginUser({ email, password });
      setForm({
        email: '',
        password: ''
      });
    }
  };

  const { handleChange, handleSubmit, form, setForm } = useForm(
    {
      email: '',
      password: ''
    },
    submit
  );

  const { email, password } = form;
  return (
    <div className='container'>
      <StyledForm>
        <Banner
          title='Log In'
          subtitle='Welcome back on Track'
          lineAfter
          titleClr='var(--primary--clr)'
        />
        <form className='form login--from' onSubmit={handleSubmit}>
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
              required
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
            />
          </div>
          <Button title='Submit' type='submit' addClass='btn-block' />
        </form>
      </StyledForm>
    </div>
  );
};

export default Login;
