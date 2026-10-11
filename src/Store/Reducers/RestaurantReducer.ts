import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    currentRestaurant: {
        latitude: number,
        longitude: number,
    },
    total: number,
    ranked: number
}

const initialState : InitialState = {
    currentRestaurant: {
        latitude: 0,
        longitude: 0
    },
    total: 0,
    ranked: 0
}

type RestaurantAction = {
    latitude: number,   
    longitude: number,
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

const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateRestaurant, (state, action : PayloadAction<RestaurantAction>) => {
            state.currentRestaurant.latitude = action.payload.latitude;
            state.currentRestaurant.longitude = action.payload.longitude;
        })
        .addCase(updateTotal, (state, action: PayloadAction<TotalAction>) => {
            state.total = action.payload.total;
        })
        .addCase(updateRanked, (state, action: PayloadAction<RankedAction>) => {
            state.ranked = action.payload.ranked;
        })
});

export default restaurantReducer;