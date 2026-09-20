import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import HeaderBar from './Components/HeaderBar';
import TopTables from './Components/TopTables';
import './styles.css';

/* 
    this is where i left off, i was working on the Categories component, i need to find an algorithm that will 
    display 4 icons of a currency and highlight them based on a condition
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