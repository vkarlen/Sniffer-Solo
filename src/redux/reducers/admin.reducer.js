import { combineReducers } from 'redux';

/*** ---- REDUCERS ---- ***/
const brandReducer = (state = ['None'], action) => {
  switch (action.type) {
    case 'ADMIN_SET_BRANDS':
      return action.payload;
    default:
      return state;
  }
};

const ingredientReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_SET_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};

const allergyReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_SET_ALLERGY_LIST':
      return action.payload;
    default:
      return state;
  }
};

const foodReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_SET_FOOD_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  brandReducer,
  ingredientReducer,
  allergyReducer,
  foodReducer,
});
