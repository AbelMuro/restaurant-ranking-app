import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i was working on the MobileHeaderBar, i need to create the link buttons now
*/

function App() {
    return (
        <Provider store={Store}>
           <HeaderBar/> 
        </Provider>
        
    )
}

export default App;