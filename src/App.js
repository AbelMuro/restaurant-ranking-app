import React from 'react';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store, {persistedStore} from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i need to check if the data being persisted in the localstorage is still there
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