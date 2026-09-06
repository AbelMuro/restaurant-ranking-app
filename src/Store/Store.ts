import {configureStore} from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import Reducer from './Reducers';

const store = configureStore({
    reducer: Reducer
});


type TypedDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>

const useTypedDispatch = () => useDispatch<TypedDispatch>();
const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;


export {useTypedDispatch, useTypedSelector}
export default store;