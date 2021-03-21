import { combineReducers } from 'redux';

/*** ---- REDUCERS ---- ***/
const brand = (state = ['None'], action) => {
  switch (action.type) {
    case 'ADMIN_SET_BRANDS':
      return action.payload;
    default:
      return state;
  }
};

const ingredient = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_SET_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};

const allergy = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_SET_ALLERGY_LIST':
      return action.payload;
    default:
      return state;
  }
};

const food = (state = [], action) => {
  switch (action.type) {
    case 'ADMIN_SET_FOOD_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  brand,
  ingredient,
  allergy,
  food,
});
