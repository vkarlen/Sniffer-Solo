import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import adminSaga from './admin.saga';
import petSaga from './pet.saga';
import foodSaga from './food.saga';

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    adminSaga(),
    petSaga(),
    foodSaga(),
  ]);
}
