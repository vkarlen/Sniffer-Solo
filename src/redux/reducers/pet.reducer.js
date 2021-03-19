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

export default combineReducers({
  petDetail,
});
