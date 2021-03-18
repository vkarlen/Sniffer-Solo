import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addFood(action) {
  //console.log('addFood', action.payload);

  try {
    yield axios.post('/api/admin/food/add', action.payload);
    alert('Success!');

    yield put({
      type: 'ADMIN_FETCH_FOOD',
    });
  } catch (error) {
    console.log('Error in addFood', error);
  }
} // end addFood

function* addAllergy(action) {
  try {
    yield axios.post('/api/admin/allergy/add', action.payload);

    yield put({
      type: 'ADMIN_FETCH_ALLERGIES',
    });
  } catch (error) {
    console.log('Error in addAllergy', error);
  }
} // end addAllergy

function* fetchBrands() {
  try {
    const brands = yield axios.get('/api/admin/brands');

    yield put({
      type: 'ADMIN_SET_BRANDS',
      payload: brands.data,
    });
  } catch (error) {
    console.log('Error in fetchBrands');
  }
} // end fetchBrands

function* fetchAllergies() {
  try {
    const allergy = yield axios.get('/api/admin/allergy');

    yield put({
      type: 'ADMIN_SET_ALLERGY_LIST',
      payload: allergy.data,
    });
  } catch (error) {
    console.log('Error in fetchAllergies');
  }
} // end fetchAllergies

function* fetchIngredients() {
  try {
    const ingredients = yield axios.get('/api/admin/ingredients');

    yield put({
      type: 'ADMIN_SET_INGREDIENTS',
      payload: ingredients.data,
    });
  } catch (error) {
    console.log('Error in fetchIngredients');
  }
} // end fetchIngredients

function* fetchFood() {
  try {
    const food = yield axios.get('/api/admin/food/');

    yield put({
      type: 'ADMIN_SET_FOOD_LIST',
      payload: food.data,
    });
  } catch (error) {
    console.log('Error in fetchFoods', error);
  }
} // end fetchFood

function* updateAllergy(action) {
  console.log('updateGrouping', action.payload);

  try {
    yield axios.put('/api/admin/ingredient/update', action.payload);

    yield put({
      type: 'ADMIN_FETCH_INGREDIENTS',
    });
  } catch (error) {
    console.log('Error in changeGrouping', error);
  }
} // end changeGrouping

function* adminSaga() {
  yield takeEvery('ADMIN_ADD_FOOD', addFood);
  yield takeEvery('ADMIN_ADD_GROUP', addAllergy);
  yield takeEvery('ADMIN_FETCH_BRANDS', fetchBrands);
  yield takeEvery('ADMIN_FETCH_ALLERGIES', fetchAllergies);
  yield takeEvery('ADMIN_FETCH_INGREDIENTS', fetchIngredients);
  yield takeEvery('ADMIN_FETCH_FOOD', fetchFood);
  yield takeEvery('ADMIN_UPDATE_ALLERGY', updateAllergy);
}

export default adminSaga;
