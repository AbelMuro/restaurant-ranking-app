import React from 'react';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store, {persistedStore} from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i need to implement the drag and drop functionality for <DisplayRestaurants/> and i also need
    to re-organize the rank numbers when a new item is added
*/

function App() {
    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistedStore}>
                <HeaderBar/> 
                <SplitContainer/>                   
            </PersistGate>
        </Provider>
    )
}

export default App;