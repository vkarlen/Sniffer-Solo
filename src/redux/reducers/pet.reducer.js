import { combineReducers } from 'redux';

const defaultPet = {
  name: '',
  breed: '',
  age: '',
  image_url: '',
  allergies: [],
};

const petDetail = (state = defaultPet, action) => {
  switch (action.type) {
    case 'SET_EXACT_PET':
      return action.payload;
    case 'CLEAR_PET':
      return defaultPet;
    default:
      return state;
  }
};

const foodlog = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOG':
      return action.payload;
    case 'CLEAR_PET':
      return [];
    default:
      return state;
  }
};

const editPet = (state = defaultPet, action) => {
  switch (action.type) {
    case 'SET_EDIT_PET':
      return action.payload;
    case 'EDIT_ONCHANGE':
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    case 'CLEAR_EDIT_PET':
      return defaultPet;
    default:
      return state;
  }
};

export default combineReducers({
  petDetail,
  foodlog,
  editPet,
});
