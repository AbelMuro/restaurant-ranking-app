import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i need to figure out how to add additional meta data for each mark in the map
*/

function App() {
    return (
        <Provider store={Store}>
           <HeaderBar/> 
            <SplitContainer/>           
        </Provider>
    )
}

export default App;