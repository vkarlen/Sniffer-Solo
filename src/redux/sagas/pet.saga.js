import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchExact(action) {
  try {
    const exactPet = yield axios.get(`/api/pet/${action.payload.id}`);

    yield put({
      type: 'SET_EXACT_PET',
      payload: exactPet.data,
    });
  } catch (error) {
    console.log('Error in fetchExact', error);
  }
} // end fetchExact

function* addPet(action) {
  console.log('addPet', action.payload);

  try {
    yield axios.post('/api/pet/add', action.payload);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in addPet', error);
  }
} // end addPet

function* updatePet(action) {
  try {
    yield axios.put(`/api/pet/edit/${action.payload.id}`, action.payload);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in updatePet', error);
  }
}

function* petSaga() {
  yield takeEvery('FETCH_EXACT_PET', fetchExact);
  yield takeEvery('ADD_PET', addPet);
  yield takeEvery('UPDATE_PET', updatePet);
}

export default petSaga;
