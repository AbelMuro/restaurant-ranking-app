import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";
import {Restaurant, Restaurants, Coordinates} from '~/Common/Types';

type InitialState = {
    selectedRestaurant: Coordinates,
    allRestaurants: Restaurants,
    selectedCategory: string
    total: number,
    ranked: number
}

const initialState : InitialState = {
    selectedRestaurant: {
        latitude: 0,
        longitude: 0
    },
    allRestaurants: [],
    selectedCategory: 'All',
    total: 0,
    ranked: 0
}

type TotalAction = {
    total: number
}

type RankedAction = {
    ranked: number
}

type CategoryAction = {
    category: string
}

const updateRestaurant = createAction<Coordinates>('UPDATE_RESTAURANT');
const updateTotal = createAction<TotalAction>('UPDATE_TOTAL');
const updateRanked = createAction<RankedAction>('UPDATE_RANKED');
const AllRestaurants = createAction<Restaurant>('UPDATE_ALL_RESTAURANTS');
const updateCategory = createAction<CategoryAction>('UPDATE_CATEGORY');

const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateRestaurant, (state, action : PayloadAction<Coordinates>) => {
            state.selectedRestaurant.latitude = action.payload.latitude;
            state.selectedRestaurant.longitude = action.payload.longitude;
        })
        .addCase(updateTotal, (state, action: PayloadAction<TotalAction>) => {
            state.total = action.payload.total;
        })
        .addCase(updateRanked, (state, action: PayloadAction<RankedAction>) => {
            state.ranked = action.payload.ranked;
        })
        .addCase(AllRestaurants, (state, action: PayloadAction<Restaurant>) => {
            state.allRestaurants.push(action.payload);
        })
        .addCase(updateCategory, (state, action: PayloadAction<CategoryAction>) => {
            state.selectedCategory = action.payload.category;
        })
});

export default restaurantReducer;