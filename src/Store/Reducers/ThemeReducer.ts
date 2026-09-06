import { createReducer, PayloadAction, createAction } from "@reduxjs/toolkit";

type InitialState = {
    theme: 'light' | 'dark'
}

const item = localStorage.getItem('theme') as InitialState['theme'];
const prevState = item ? item : 'light';

const initialState : InitialState = {
    theme: prevState
};

const CHANGE_THEME = createAction<InitialState>('CHANGE_THEME');

const themeReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(CHANGE_THEME, (state, action: PayloadAction<InitialState>) => {
            state.theme = action.payload.theme;
        })
});

export default themeReducer;