import React, { useContext } from 'react';
import useForm from '../../../Hooks/useForm';
import { StyledForm } from '../../../Ui/FormsStyles/formstyle';
import Banner from '../../../Ui/banner/banner';
import Button from '../../../Ui/button/Button';
import ProfileContext from '../../../Context/profile/ProfileContext';

const FoodSearch = () => {
  const { getFoodSearch } = useContext(ProfileContext);

  const submit = () => {
    if (form.search === '') return;

    // Get Food Data from form text
    getFoodSearch(form.search);

    // Clear Search Bar
    setForm({ search: '' });
  };

  const { handleChange, handleSubmit, form, setForm } = useForm(
    { search: '' },
    submit
  );

  return (
    <StyledForm marginForm='6em 0'>
      <Banner
        title='Search'
        subtitle='what are you hungry for'
        lineAfter
        titleClr='var(--primary--clr)'
      />
      <form className='form login--from' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            id='search'
            name='search'
            value={form.search}
            onChange={handleChange}
            type='search'
            className='form-control'
            aria-describedby='search'
            placeholder='look for something...'
            required
          />
        </div>
        <Button title='Search' type='submit' addClass='btn-block' />
      </form>
    </StyledForm>
  );
};

export default FoodSearch;
