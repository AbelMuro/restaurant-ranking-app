import {createReducer, createAction, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
    search: string
}

const UPDATE_SEARCH = createAction<{search: string}>('UPDATE_SEARCH');
const initialState : InitialState = {
    search: ''
}

const searchReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(UPDATE_SEARCH, (state, action : PayloadAction<{search: string}>) => {
            state.search = action.payload.search;
        })
});

export default searchReducer;