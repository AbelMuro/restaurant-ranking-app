import {configureStore} from '@reduxjs/toolkit';
import { 
    persistStore, 
    persistReducer,
    PERSIST,
    FLUSH,
    REHYDRATE,
    PAUSE, 
    PURGE,
    REGISTER, 
} from 'redux-persist';
import { getPersistConfig } from 'redux-deep-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import Reducer from './Reducers';

const config = getPersistConfig({
    key: 'root',
    storage,
    rootReducer: Reducer,
    whitelist: ['location.user', 'location.markers.saved']
});  

const persistedReducer = persistReducer(config, Reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: {ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
});


type TypedDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>
const useTypedDispatch = () => useDispatch<TypedDispatch>();
const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;


export {useTypedDispatch, useTypedSelector}
export const persistedStore = persistStore(store)
export default store;