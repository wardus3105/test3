import createSagaMiddleware from "redux-saga";
import configureStore from "./stores/configureStore";
import rootSagas from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
sagaMiddleware.run(rootSagas);
export default store;
