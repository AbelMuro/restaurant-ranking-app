import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, i was working on the SplitContainer component

    i am fixing a bug with the responsiveness of the component, when i switch from mobile
    to desktop, the SPlitCOntainer component retains the height value when it gets resized, this is 
    not supposed to happen
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