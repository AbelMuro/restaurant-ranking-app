import SearchReducer from './SearchReducer.ts';
import ThemeReducer from './ThemeReducer.ts';
import restaurantReducer from './RestaurantReducer.ts';
import locationReducer from './LocationReducer.ts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    search: SearchReducer,
    theme: ThemeReducer,
    restaurant: restaurantReducer,
    location: locationReducer
})

export default rootReducer;