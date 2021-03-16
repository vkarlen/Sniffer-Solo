import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addFood(action) {
  //console.log('addFood', action.payload);

  try {
    yield axios.post('/api/food/add', action.payload);
    alert('Success!');
  } catch (error) {
    console.log('Error in addFood', error);
  }
} // end addFood

function* addAllergy(action) {
  try {
    yield axios.post('/api/food/allergy/add', action.payload);

    yield put({
      type: 'FETCH_ALLERGIES',
    });
  } catch (error) {
    console.log('Error in addAllergy', error);
  }
} // end addAllergy

function* fetchBrands() {
  try {
    const brands = yield axios.get('/api/food/brands');

    yield put({
      type: 'SET_BRANDS',
      payload: brands.data,
    });
  } catch (error) {
    console.log('Error in fetchBrands');
  }
} // end fetchBrands

function* fetchAllergies() {
  try {
    const allergy = yield axios.get('/api/food/allergy');

    yield put({
      type: 'SET_ALLERGY_LIST',
      payload: allergy.data,
    });
  } catch (error) {
    console.log('Error in fetchAllergies');
  }
} // end fetchAllergies

function* fetchIngredients() {
  try {
    const ingredients = yield axios.get('/api/food/ingredients');

    yield put({
      type: 'SET_INGREDIENTS',
      payload: ingredients.data,
    });
  } catch (error) {
    console.log('Error in fetchIngredients');
  }
} // end fetchIngredients

function* fetchFood() {
  try {
    const food = yield axios.get('/api/food/');

    yield put({
      type: 'SET_FOOD_LIST',
      payload: food.data,
    });
  } catch (error) {
    console.log('Error in fetchFoods', error);
  }
} // end fetchFood

function* updateAllergy(action) {
  console.log('updateGrouping', action.payload);

  try {
    yield axios.put('/api/food/update', action.payload);

    yield put({
      type: 'FETCH_INGREDIENTS',
    });
  } catch (error) {
    console.log('Error in changeGrouping', error);
  }
} // end changeGrouping

function* foodSaga() {
  yield takeEvery('ADD_FOOD', addFood);
  yield takeEvery('ADD_GROUP', addAllergy);
  yield takeEvery('FETCH_BRANDS', fetchBrands);
  yield takeEvery('FETCH_ALLERGIES', fetchAllergies);
  yield takeEvery('FETCH_INGREDIENTS', fetchIngredients);
  yield takeEvery('FETCH_FOOD', fetchFood);
  yield takeEvery('UPDATE_ALLERGY', updateAllergy);
}

export default foodSaga;
