import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    currentRestaurant: {
        name: '',
        visited: 0,
        address: ''
    },
    total: 0,
    ranked: 0
}

type Action = {
    currentRestaurant: {
        name: string,
        visited: number,
        address: string,        
    },
    total: number,
    ranked: number
}

const updateRestaurant = createAction<Action>('UPDATE_RESTAURANT');

const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateRestaurant, (state, action : PayloadAction<Action>) => {
            state.currentRestaurant.name = action.payload.currentRestaurant.name;
            state.currentRestaurant.visited = action.payload.currentRestaurant.visited;
            state.currentRestaurant.address = action.payload.currentRestaurant.address;
            state.total = action.payload.total;
            state.ranked = action.payload.ranked;
        })
});

export default restaurantReducer;