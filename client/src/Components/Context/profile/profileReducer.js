// types
import {
  SET_MACROS_GOALS,
  GET_MEAL_DATA,
  SET_MEAL_DATA,
  SET_SEARCH_FOOD,
  SET_MODAL,
  SET_FOOD_SELECTED,
  SET_FOOD_EDIT,
  EDIT_FOOD_SELECTED,
  CLEAR_FOOD_EDIT,
  CLEAR_FOOD_SELECTED,
  SET_MACROS_NUMBERS,
  CLEAR_MACROS_NUMBERS,
  SET_ERROR,
  CLEAR_ERROR,
  DELETE_FOOD,
  GET_EXERCISE,
  SET_EXERCISE,
  EDIT_EXERCISE,
  GET_EDIT_EXERCISE,
  DELETE_EXERCISE,
  CLEAR_EDIT_EXERCISE,
  SET_LOADING,
  CLEAR_SEARCH_FOOD,
  RESET_ALL
} from './profileTypes';

const useProfileReducer = (state, action) => {
  switch (action.type) {
    case SET_MACROS_GOALS:
      return {
        ...state,
        macrosGoals: action.payload,
        loading: false
      };
    case GET_MEAL_DATA:
      return {
        ...state,
        meals: {
          meal_1: action.payload.filter(meal => meal.meal === 'meal_1' && meal),
          meal_2: action.payload.filter(meal => meal.meal === 'meal_2' && meal),
          meal_3: action.payload.filter(meal => meal.meal === 'meal_3' && meal),
          meal_4: action.payload.filter(meal => meal.meal === 'meal_4' && meal),
          meal_5: action.payload.filter(meal => meal.meal === 'meal_5' && meal),
          meal_6: action.payload.filter(meal => meal.meal === 'meal_6' && meal)
        },
        loading: false
      };
    case SET_MEAL_DATA:
      return {
        ...state,
        meals: {
          ...state.meals,
          [action.typeFor]: [...state.meals[action.typeFor], action.payload]
        },
        loading: false
      };
    case EDIT_FOOD_SELECTED:
      return {
        ...state,
        meals: {
          ...state.meals,
          [action.typeFor]: state.meals[action.typeFor].map(meal =>
            meal._id === action.payload._id ? action.payload : meal
          )
        },
        loading: false
      };
    case DELETE_FOOD:
      return {
        ...state,
        meals: {
          ...state.meals,
          [action.typeFor]: state.meals[action.typeFor].filter(
            meal => meal._id !== action.id
          )
        }
      };
    case SET_SEARCH_FOOD:
      return {
        ...state,
        searchData: action.payload.food,
        nextPage: action.payload.next_page,
        loading: false,
        isFoodSearch: true
      };
    case CLEAR_SEARCH_FOOD:
      return {
        ...state,
        searchData: null,
        nextPage: null,
        loading: true
      };
    case SET_FOOD_SELECTED:
      return {
        ...state,
        foodSelected: action.payload
      };
    case CLEAR_FOOD_SELECTED:
      return {
        ...state,
        foodSelected: null
      };
    case SET_FOOD_EDIT:
      return {
        ...state,
        foodEdit: true
      };
    case GET_EXERCISE:
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.typeFor]: action.payload
        },
        loading: false
      };
    case SET_EXERCISE:
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.typeFor]: [action.payload, ...state.exercises[action.typeFor]]
        },
        loading: false
      };
    case GET_EDIT_EXERCISE:
      return {
        ...state,
        exercisesEdit: action.payload
      };
    case CLEAR_EDIT_EXERCISE:
      return {
        ...state,
        exercisesEdit: null
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.typeFor]: state.exercises[action.typeFor].filter(
            eercise => eercise._id !== action.id
          )
        },
        erros: action.payload
      };
    case EDIT_EXERCISE:
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [action.typeFor]: state.exercises[action.typeFor].map(exercise =>
            exercise._id === action.payload._id ? action.payload : exercise
          )
        }
      };
    case CLEAR_FOOD_EDIT:
      return {
        ...state,
        foodEdit: false
      };
    case SET_MACROS_NUMBERS:
      return {
        ...state,
        macroInfo: { ...state.macroInfo, [action.typeFor]: action.payload }
      };
    case CLEAR_MACROS_NUMBERS:
      return {
        ...state,
        macroInfo: { ...state.macroInfo, changeMacro: null }
      };
    case SET_MODAL:
      return {
        ...state,
        modalShow: { show: !state.modalShow.show, modalFor: action.forModal }
      };
    case SET_ERROR:
      return {
        ...state,
        erros: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        erros: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case RESET_ALL:
      return {
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
    default:
      return state;
  }
};

export default useProfileReducer;
