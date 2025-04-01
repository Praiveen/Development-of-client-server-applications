import { createStore } from 'redux';
import agreementReducer from './agreementReducer';

const store = createStore(agreementReducer);

export default store; 