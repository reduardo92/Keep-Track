import React, { useReducer, useRef } from 'react';
import ProfileContext from './ProfileContext';
import useProfileReducer from './profileReducer';
import axios from 'axios';
// types
import {
  GET_MEAL_DATA,
  SET_MACROS_GOALS,
  SET_MEAL_DATA,
  SET_SEARCH_FOOD,
  SET_FOOD_EDIT,
  SET_MODAL,
  SET_FOOD_SELECTED,
  SET_ERROR,
  CLEAR_ERROR,
  SET_MACROS_NUMBERS,
  GET_EXERCISE,
  SET_EXERCISE,
  GET_EDIT_EXERCISE,
  CLEAR_SEARCH_FOOD
} from './profileTypes';
import configHeader from '../../Utility/configHeader';

const profileInitalState = {
  macrosGoals: null,
  meals: {
    meal_1: [],
    meal_2: [],
    meal_3: [],
    meal_4: [],
    meal_5: [],
    meal_6: []
  },
  foodSelected: null,
  foodEdit: false,
  exercises: {
    cardio: null,
    weights: null
  },
  exercisesEdit: null,
  macroInfo: { initalMacro: null, changeMacro: null },
  searchData: null,
  nextPage: null,
  modalShow: { show: false, modalFor: 'meal' },
  erros: null,
  loading: true,
  isFoodSearch: false
};

const ProileState = ({ children }) => {
  const [state, dispatch] = useReducer(useProfileReducer, profileInitalState);

  // Refs
  const navRef = useRef();

  // Get Goals Macros
  const getMacrosGoal = async () => {
    try {
      const { data } = await axios.get('/api/macros');

      dispatch({
        type: SET_MACROS_GOALS,
        payload: data.length === 0 ? null : data[0]
      });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };
  // Set Goals Macros
  const setMacrosGoal = async macros => {
    try {
      const { data } = state.macrosGoals
        ? await axios.put(`/api/macros/${macros._id}`, macros, configHeader)
        : await axios.post('/api/macros', macros, configHeader);

      dispatch({ type: SET_MACROS_GOALS, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };
  // Get Search Food
  const getFoodSearch = async searchText => {
    dispatch({ type: CLEAR_SEARCH_FOOD });
    try {
      const { data } = await axios.get(`/api/food?search=${searchText}`);

      dispatch({ type: SET_SEARCH_FOOD, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: 'Sorry No food found, try again' });

      setInterval(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  // handle Modal show
  const handleModal = (forModal = 'meal') =>
    dispatch({ type: SET_MODAL, forModal });

  // change add food by servings and size
  const getFoodMacros = async (foodId, serving, size) => {
    const body = { foodId, serving, size };
    try {
      const { data } = await axios.post(`/api/food`, body);

      dispatch({
        type: SET_MACROS_NUMBERS,
        typeFor: 'changeMacro',
        payload: data
      });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: 'Sorry No food found, try again' });
    }
  };

  // Set Modal for add food on page FOOD
  const setFoodSelected = food => {
    const energy = {
      ENERC_KCAL: food.ENERC_KCAL,
      FAT: food.FAT,
      CHOCDF: food.CHOCDF,
      PROCNT: food.PROCNT
    };

    dispatch({ type: SET_FOOD_SELECTED, payload: food });
    dispatch({
      type: SET_MACROS_NUMBERS,
      typeFor: 'initalMacro',
      payload: energy
    });
  };

  // GET MEALS
  const getMeals = async () => {
    try {
      const { data } = await axios.get('/api/meal');

      dispatch({ type: GET_MEAL_DATA, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };
  // setMeal
  const setMeal = async (dataInfo, typeFor) => {
    try {
      const { data } = await axios.post('/api/meal', dataInfo, configHeader);

      dispatch({ type: SET_MEAL_DATA, typeFor, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };

  // Clear State by type
  const clearType = type => dispatch({ type });

  // Get Edit Food from Diary Meal
  const getMealEdit = meal => {
    // Open Modal
    dispatch({ type: SET_MODAL, forModal: 'meal' });
    // Set FoodSelected
    dispatch({ type: SET_FOOD_SELECTED, payload: meal });
    // Set Macros
    dispatch({
      type: SET_MACROS_NUMBERS,
      typeFor: 'initalMacro',
      payload: {
        ENERC_KCAL: meal.ENERC_KCAL,
        FAT: meal.FAT,
        CHOCDF: meal.CHOCDF,
        PROCNT: meal.PROCNT
      }
    });

    // Set Food Edit
    dispatch({ type: SET_FOOD_EDIT, payload: meal.meal });
  };

  // Delete Food from Diary Meal or exercise
  const hanldeDelete = async (type, id, typeFor, url) => {
    try {
      await axios.delete(url);

      dispatch({ type, id, typeFor });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };

  // Update Edit Food or Exercise
  const updateData = async (type, dataInfo, typeFor, url) => {
    try {
      const { data } = await axios.put(url, dataInfo, configHeader);

      dispatch({ type, typeFor, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };

  // Get Exercises to load from server
  const getExercises = async (url, typeFor) => {
    try {
      const { data } = await axios.get(url);

      dispatch({
        type: GET_EXERCISE,
        payload: data,
        typeFor
      });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };
  // Set Exercises
  const setExercises = async (dataInfo, typeFor) => {
    const cardio = '/api/cardio';
    const weights = '/api/weights';

    try {
      const { data } = await axios.post(
        typeFor === 'cardio' ? cardio : weights,
        dataInfo,
        configHeader
      );

      dispatch({ type: SET_EXERCISE, typeFor, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.response.data.msg });
    }
  };

  // Set Current exercise to edit
  const getExerciseEdit = data =>
    dispatch({ type: GET_EDIT_EXERCISE, payload: data });

  // ////
  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getMeals,
        setMeal,
        setMacrosGoal,
        getMacrosGoal,
        getFoodSearch,
        getFoodMacros,
        handleModal,
        setFoodSelected,
        clearType,
        hanldeDelete,
        getMealEdit,
        updateData,
        getExercises,
        setExercises,
        getExerciseEdit,
        navRef
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProileState;
