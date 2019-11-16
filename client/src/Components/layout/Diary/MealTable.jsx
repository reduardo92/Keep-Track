import React from 'react';
import windowWidth from '../../Utility/windowWidth';
import { LinkStyle } from '../../Ui/button/Button';
import MealItem from './MealItem';
import mealTotalMacros from '../../Utility/mealTotalMacros';

const MealTable = ({ numberMeal, meal }) => {
  return (
    <div className='table--container'>
      <table className='table'>
        <thead className='table--head'>
          <tr className='table--head--tr'>
            <th className='table--head--th' scope='col'>
              {windowWidth(numberMeal, `Meal ${numberMeal}`)}
            </th>
            <th className='table--head--th' scope='col'>
              {windowWidth('Cal', 'Calories')}
            </th>
            <th className='table--head--th' scope='col'>
              {windowWidth('F', 'Fat')}
            </th>
            <th className='table--head--th' scope='col'>
              {windowWidth('C', 'Carbs')}
            </th>
            <th className='table--head--th' scope='col'>
              {windowWidth('P', 'Protein')}
            </th>
            <th className='table--head--th' scope='col'>
              {' '}
            </th>
            <th className='table--head--th' scope='col'>
              {' '}
            </th>
          </tr>
        </thead>
        <tbody className='table--tbody'>
          {/* Meal Food */}
          {meal.length !== 0 &&
            meal.map((meal, i) => (
              <MealItem key={meal.foodId + i} meal={meal} />
            ))}
          {/* Meal Food */}
          <tr className='table--tbody--tr total'>
            <th className='table--tbody--th' scope='row'>
              <p className='total--text'>Total</p>
            </th>
            <td className='table--tbody--th'>
              {mealTotalMacros('ENERC_KCAL', meal)}
            </td>
            <td className='table--tbody--th'>{mealTotalMacros('FAT', meal)}</td>
            <td className='table--tbody--th'>
              {mealTotalMacros('CHOCDF', meal)}
            </td>
            <td className='table--tbody--th'>
              {mealTotalMacros('PROCNT', meal)}
            </td>
            <td className='table--tbody--th'></td>
            <td className='table--tbody--th'></td>
          </tr>
        </tbody>
      </table>
      <LinkStyle className='btn' to='/food'>
        Add Food
      </LinkStyle>
    </div>
  );
};

export default MealTable;
