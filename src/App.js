import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import HeaderBar from './Components/HeaderBar';
import TopTables from './Components/TopTables';
import './styles.css';

/* 
    this is where i left off, i was working on the DisplayRestaurants component, i need to use css to change
    the color of the numbers from black to light grey as they ascend
*/

function App() {
    return (
        <Provider store={Store}>
           <HeaderBar/> 
           <TopTables/>
        </Provider>
        
    )
}

export default App;