import React from 'react';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store, {persistedStore} from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i need to fix the issue regarding the rank exchange between the restaurants
    when they are being dragged and dropped. i may need to find a better way to dispatch the 'rearrange restaurants'
    action in the useDrop hook
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