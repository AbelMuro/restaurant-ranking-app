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

type ReArrangeAction = {
    draggedItem: {
        id: string,
        rank: number
    },
    currentItem: {
        id: string,
        rank: number
    }
}

const updateRestaurant = createAction<Coordinates>('UPDATE_RESTAURANT');
const updateTotal = createAction<TotalAction>('UPDATE_TOTAL');
const AllRestaurants = createAction<Restaurant>('UPDATE_ALL_RESTAURANTS');
const updateCategory = createAction<CategoryAction>('UPDATE_CATEGORY');
const rankRestaurant = createAction<RankAction>('RANK_RESTAURANT');
const reArrangeRestaurants = createAction<ReArrangeAction>('REARRANGE_RESTAURANTS');

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
            const rankedRestaurants = allRestaurants.filter((restaurant) => {
                return !restaurant.try;
            });
            const restaurantToUpdate = allRestaurants.filter((restaurant) => {
                return restaurant.id === restaurantId;
            })[0];

            restaurantToUpdate.rank = rankedRestaurants.length + 1;
            restaurantToUpdate.try = false;
            allRestaurants.sort((a, b) => {
                if(a.rank > b.rank)
                    return 1;
                else
                    return -1;
            });
        })
        .addCase(reArrangeRestaurants, (state, action: PayloadAction<ReArrangeAction>) => {
            const allRestaurants = state.allRestaurants;
            const currentItem = action.payload.currentItem;
            const draggedItem = action.payload.draggedItem;

            allRestaurants.forEach((restaurant) => {
                if(restaurant.id === currentItem.id){
                    restaurant.rank = draggedItem.rank;
                    console.log('currentItem', draggedItem.rank)
                }
                    
                else if(restaurant.id === draggedItem.id){
                    restaurant.rank = currentItem.rank;
                    console.log('draggedItem', currentItem.rank)
                } 
            });

            allRestaurants.sort((a, b) => {
                if(a.rank > b.rank)
                    return 1;
                else
                    return -1;
            });
        })
});

export default restaurantReducer;