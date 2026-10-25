import SearchReducer from './SearchReducer.ts';
import ThemeReducer from './ThemeReducer.ts';
import restaurantReducer from './RestaurantReducer.ts';
import MapReducer from './MapReducer.ts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    search: SearchReducer,
    theme: ThemeReducer,
    restaurant: restaurantReducer,
    map: MapReducer
})

export default rootReducer;