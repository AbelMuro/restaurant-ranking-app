import React from 'react';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store, {persistedStore} from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i need to make sure i do a proper fetch request i <AddPlaceInput/> the name i search for does not come up in the results
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