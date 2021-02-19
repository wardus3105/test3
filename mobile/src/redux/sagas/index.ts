import { all, takeLatest, fork } from 'redux-saga/effects';
import { loginMobileSaga } from './user-sagas';
import { LOGIN_MOBILE } from 'redux/actions';

export default function* rootSaga() {
  yield all([takeLatest(LOGIN_MOBILE, loginMobileSaga)]);
}
