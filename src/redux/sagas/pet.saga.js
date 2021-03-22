import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchExact(action) {
  try {
    const exactPet = yield axios.get(`/api/pet/details/${action.payload.id}`);

    yield put({
      type: 'SET_EXACT_PET',
      payload: exactPet.data,
    });
  } catch (error) {
    console.log('Error in fetchExact', error);
  }
} // end fetchExact

function* fetchLog(action) {
  try {
    const foodlog = yield axios.get(`/api/pet/log/${action.payload}`);

    yield put({
      type: 'SET_LOG',
      payload: foodlog.data,
    });
  } catch (error) {
    console.log('Error fetching log', error);
  }
} // end fetchLog

function* addPet(action) {
  try {
    yield axios.post('/api/pet/add', action.payload);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in addPet', error);
  }
} // end addPet

function* addToLog(action) {
  try {
    yield axios.post('/api/pet/log/add', action.payload);

    yield put({
      type: 'FETCH_LOG',
    });
  } catch (error) {
    console.log('Error adding to log', error);
  }
}

function* updatePet(action) {
  try {
    yield axios.put(`/api/pet/edit/${action.payload.id}`, action.payload);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in updatePet', error);
  }
} // end updatePet

function* deletePet(action) {
  try {
    yield axios.delete(`/api/pet/delete/${action.payload}`);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in deletePet', error);
  }
}

function* petSaga() {
  yield takeEvery('FETCH_EXACT_PET', fetchExact);
  yield takeEvery('FETCH_LOG', fetchLog);
  yield takeEvery('ADD_PET', addPet);
  yield takeEvery('ADD_TO_LOG', addToLog);
  yield takeEvery('UPDATE_PET', updatePet);
  yield takeEvery('DELETE_PET', deletePet);
}

export default petSaga;
