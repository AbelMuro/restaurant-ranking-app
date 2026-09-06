import SearchReducer from './SearchReducer.ts';
import ThemeReducer from './ThemeReducer.ts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    search: SearchReducer,
    theme: ThemeReducer
})

export default rootReducer;