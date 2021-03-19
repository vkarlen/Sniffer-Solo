import { combineReducers } from 'redux';

const search = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload;
    case 'CLEAR_SEARCH':
      return [];
    default:
      return state;
  }
};

const allergy = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALLERGIES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  search,
  allergy,
});
