import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    currentRestaurant: {
        address: '',
    },
    total: 0,
    ranked: 0
}

type RestaurantAction = {
    currentRestaurant: {
        address: string,   
    }
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
            state.currentRestaurant.address = action.payload.currentRestaurant.address;
        })
        .addCase(updateTotal, (state, action: PayloadAction<TotalAction>) => {
            state.total = action.payload.total;
        })
        .addCase(updateRanked, (state, action: PayloadAction<RankedAction>) => {
            state.ranked = action.payload.ranked;
        })
});

export default restaurantReducer;