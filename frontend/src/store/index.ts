import { legacy_createStore as createStore, type Store } from 'redux'
import type { AppAction, RootState } from './types';
import reducer from './reducer';

const store: Store<RootState, AppAction> = createStore(reducer);

export type AppDispatch = typeof store.dispatch;

export default store