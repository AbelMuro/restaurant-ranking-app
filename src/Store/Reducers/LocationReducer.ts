import {createReducer, createAction, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
    user: {
        latitude: number,
        longitude: number,        
    }
    markers: Array<{latitude: number, longitude: number}>,
    open: boolean
}

const initialState : InitialState = {
    user: {
        latitude: 0,
        longitude: 0,        
    },
    markers: [],
    open: false,
}

const updateLocation = createAction<{latitude: number, longitude: number}>('UPDATE_LOCATION');
const createMarker = createAction<{latitude: number, longitude: number}>('CREATE_MARKER');
const displayInput = createAction('DISPLAY_INPUT');

const LocationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateLocation, (state, action : PayloadAction<{latitude: number, longitude: number}>) => {
            state.user = {
                latitude : action.payload.latitude,
                longitude: action.payload.longitude,
            };
        })
        .addCase(createMarker, (state, action: PayloadAction<{latitude: number, longitude: number}>) => {
            const latitude = action.payload.latitude;
            const longitude = action.payload.longitude;

            state.markers.push({latitude, longitude});
        })
        .addCase(displayInput, (state) => {
            state.open = !state.open;
        })

});

export default LocationReducer;
