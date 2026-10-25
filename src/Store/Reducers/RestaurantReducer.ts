import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    selectedRestaurant: {
        latitude: number,
        longitude: number,
    },
    allRestaurants: Array<{latitude: number, longitude: number, name: string, city: string, country: string, category: string}>
    total: number,
    ranked: number
}

const initialState : InitialState = {
    selectedRestaurant: {
        latitude: 0,
        longitude: 0
    },
    allRestaurants: [],
    total: 0,
    ranked: 0
}

type RestaurantAction = {
    latitude: number,   
    longitude: number,
}

type AllRestaurantsAction = {
    latitude: number,
    longitude: number,
    name: string, 
    city: string, 
    country: string,
    category: string
}

type TotalAction = {
    total: number
}

type RankedAction = {
    ranked: number
}

const updateRestaurant = createAction<RestaurantAction>('UPDATE_RESTAURANT');
const updateTotal = createAction<TotalAction>('UPDATE_TOTAL');
const updateRanked = createAction<RankedAction>('UPDATE_RANKED');
const AllRestaurants = createAction<AllRestaurantsAction>('UPDATE_ALL_RESTAURANTS');

const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateRestaurant, (state, action : PayloadAction<RestaurantAction>) => {
            state.selectedRestaurant.latitude = action.payload.latitude;
            state.selectedRestaurant.longitude = action.payload.longitude;
        })
        .addCase(updateTotal, (state, action: PayloadAction<TotalAction>) => {
            state.total = action.payload.total;
        })
        .addCase(updateRanked, (state, action: PayloadAction<RankedAction>) => {
            state.ranked = action.payload.ranked;
        })
        .addCase(AllRestaurants, (state, action: PayloadAction<AllRestaurantsAction>) => {
            state.allRestaurants.push(action.payload);
        })
});

export default restaurantReducer;