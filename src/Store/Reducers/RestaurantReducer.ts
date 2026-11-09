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

type RankAction = {
    id: string
}

type CategoryAction = {
    category: string
}


const updateRestaurant = createAction<Coordinates>('UPDATE_RESTAURANT');
const updateTotal = createAction<TotalAction>('UPDATE_TOTAL');
const AllRestaurants = createAction<Restaurant>('UPDATE_ALL_RESTAURANTS');
const updateCategory = createAction<CategoryAction>('UPDATE_CATEGORY');
const rankRestaurant = createAction<RankAction>('RANK_RESTAURANT');

const restaurantReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateRestaurant, (state, action : PayloadAction<Coordinates>) => {
            state.selectedRestaurant.latitude = action.payload.latitude;
            state.selectedRestaurant.longitude = action.payload.longitude;
        })
        .addCase(updateTotal, (state, action: PayloadAction<TotalAction>) => {
            state.total = action.payload.total;
        })
        .addCase(AllRestaurants, (state, action: PayloadAction<Restaurant>) => {
            state.allRestaurants.push(action.payload);
        })
        .addCase(updateCategory, (state, action: PayloadAction<CategoryAction>) => {
            state.selectedCategory = action.payload.category;
        })
        .addCase(rankRestaurant, (state, action: PayloadAction<RankAction>) => {
            const restaurantId = action.payload.id;
            const allRestaurants = state.allRestaurants;

            allRestaurants.forEach((restaurant) => {
                if(restaurant.id === restaurantId){
                    restaurant.rank = 1;
                    restaurant.try = false;
                }
                    

            })
      
        })
});

export default restaurantReducer;