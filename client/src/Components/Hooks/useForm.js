import { useState } from 'react';

const useForm = (initialState, callback) => {
  const [form, setForm] = useState(initialState);

  const handleChange = e => {
    e.persist();
    setForm(form => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation();
    }

    callback();
  };

  return { handleChange, handleSubmit, form, setForm };
};

export default useForm;
