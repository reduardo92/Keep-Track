import React, { useContext } from 'react';
import noFoodImg from '../../../assets/img/icons/noFoodImg.png';
import ProfileContext from '../../Context/profile/ProfileContext';
import { DELETE_FOOD } from '../../Context/profile/profileTypes';
import AlertContext from '../../Context/alert/AlertContext';

const MealItem = ({ meal }) => {
  const { hanldeDelete, getMealEdit } = useContext(ProfileContext);
  const { setAlert } = useContext(AlertContext);

  const mealLabel =
    meal.meal.charAt(0).toUpperCase() +
    meal.meal
      .slice(1)
      .split('_')
      .join(' ');

  const setDelete = ({ _id, label, meal }) => {
    hanldeDelete(DELETE_FOOD, _id, meal, `/api/meal/${_id}`);
    setAlert(`${label} removed from ${mealLabel}`, 'success');
  };

  return (
    <tr className='table--tbody--tr'>
      <th className='table--tbody--th th-head' scope='row'>
        <img
          src={meal.image ? meal.image : noFoodImg}
          alt={meal.label}
          className='meal--img'
        />
        <p className='meal--name'>{meal.label}</p>
      </th>
      <td className='table--tbody--th'>{meal.ENERC_KCAL}</td>
      <td className='table--tbody--th'>{meal.FAT}</td>
      <td className='table--tbody--th'>{meal.CHOCDF}</td>
      <td className='table--tbody--th'>{meal.PROCNT}</td>
      <td className='table--tbody--th'>
        <i onClick={() => getMealEdit(meal)} className='far fa-plus-square'></i>
      </td>
      <td className='table--tbody--th'>
        <i onClick={() => setDelete(meal)} className='fas fa-minus-circle'></i>
      </td>
    </tr>
  );
};

export default MealItem;
