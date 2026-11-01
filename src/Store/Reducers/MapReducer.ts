import {createReducer, createAction, PayloadAction} from '@reduxjs/toolkit';
import {Restaurant, Restaurants} from '~/Common/Types';

type InitialState = {
    center: {
        latitude: number,
        longitude: number,        
    }
    markers: {
        temp: Restaurants,
        saved: Restaurants,
    },
    open: boolean
}

type Coordinates = {
    latitude: number, 
    longitude: number
}

const initialState : InitialState = {
    center: {
        latitude: 0,
        longitude: 0,        
    },
    markers: {
        temp: [],
        saved: []
    },
    open: false,
}

type MarkerAction = Restaurant;

const updateCenter = createAction<Coordinates>('UPDATE_CENTER');
const createSavedMarker = createAction<MarkerAction>('CREATE_SAVED_MARKER');
const clearSavedMarkers = createAction('CLEAR_SAVED_MARKERS');
const createTempMarker = createAction<MarkerAction>('CREATE_TEMP_MARKER');
const clearTempMarkers = createAction('CLEAR_TEMP_MARKERS');
const displayInput = createAction('DISPLAY_INPUT');

const MapReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateCenter, (state, action : PayloadAction<Coordinates>) => {
            state.center = {
                latitude : action.payload.latitude,
                longitude: action.payload.longitude,
            };
        })
        .addCase(createSavedMarker, (state, action: PayloadAction<MarkerAction>) => {
            const latitude = action.payload.latitude;
            const longitude = action.payload.longitude;
            const name = action.payload.name;
            const city = action.payload.city;
            const country = action.payload.country;
            const category = action.payload.category;

            state.markers.saved.push({latitude, longitude, name, city, country, category});
        })
        .addCase(createTempMarker, (state, action: PayloadAction<MarkerAction>) => {
            const latitude = action.payload.latitude;
            const longitude = action.payload.longitude;
            const name = action.payload.name;
            const city = action.payload.city;
            const country = action.payload.country;
            const category = action.payload.category;

            state.markers.temp.push({latitude, longitude, name, city, country, category});
        })
        .addCase(displayInput, (state) => {
            state.open = !state.open;
        })
        .addCase(clearTempMarkers, (state) => {
            state.markers.temp = [];
        })
        .addCase(clearSavedMarkers, (state) => {
            state.markers.saved = [];
        })
});

export default MapReducer;
