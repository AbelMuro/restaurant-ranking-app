import {createReducer, createAction, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
    user: {
        latitude: number,
        longitude: number,        
    }
    markers: {
        temp: Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>,
        saved: Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>,
    },
    open: boolean
}

type Coordinates = {
    latitude: number, 
    longitude: number
}

const initialState : InitialState = {
    user: {
        latitude: 0,
        longitude: 0,        
    },
    markers: {
        temp: [],
        saved: []
    },
    open: false,
}

const updateLocation = createAction<Coordinates>('UPDATE_LOCATION');
const createSavedMarker = createAction<{details : {name: string, country: string, city: string}, latitude: number, longitude: number}>('CREATE_SAVED_MARKER');
const clearSavedMarkers = createAction('CLEAR_SAVED_MARKERS');
const createTempMarker = createAction<{details : {name: string, country: string, city: string}, latitude: number, longitude: number}>('CREATE_TEMP_MARKER');
const clearTempMarkers = createAction('CLEAR_TEMP_MARKERS');
const displayInput = createAction('DISPLAY_INPUT');

const LocationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateLocation, (state, action : PayloadAction<Coordinates>) => {
            state.user = {
                latitude : action.payload.latitude,
                longitude: action.payload.longitude,
            };
        })
        .addCase(createSavedMarker, (state, action: PayloadAction<{latitude: number, longitude: number, details : {name: string, country: string, city: string}}>) => {
            const latitude = action.payload.latitude;
            const longitude = action.payload.longitude;
            const details = action.payload.details;

            state.markers.saved.push({latitude, longitude, details});
        })
        .addCase(createTempMarker, (state, action: PayloadAction<{latitude: number, longitude: number, details : {name: string, country: string, city: string}}>) => {
            const latitude = action.payload.latitude;
            const longitude = action.payload.longitude;
            const details = action.payload.details;

            state.markers.temp.push({latitude, longitude, details});
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

export default LocationReducer;
