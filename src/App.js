import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i was working on the light and dark themes in the ThemeButton component, 
*/

function App() {
    return (
        <Provider store={Store}>
           <HeaderBar/> 
        </Provider>
        
    )
}

export default App;