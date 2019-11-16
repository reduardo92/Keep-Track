import React, { useReducer } from 'react';
import uuid from 'uuid';
import UseAlertReducer from './UseAlertReducer';
import AlertContext from './AlertContext';
import { SET_ALERT, REMOVE_ALERT } from '../profile/profileTypes';

const initialAlertState = [];

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(UseAlertReducer, initialAlertState);

  // Set Alert
  const setAlert = (msg, typeFor, timeout = 3000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { msg, typeFor, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
