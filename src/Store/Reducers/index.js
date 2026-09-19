import SearchReducer from './SearchReducer.ts';
import ThemeReducer from './ThemeReducer.ts';
import restaurantReducer from './RestaurantReducer.ts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    search: SearchReducer,
    theme: ThemeReducer,
    restaurant: restaurantReducer,
})

export default rootReducer;