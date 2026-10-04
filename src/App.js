import React from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import SplitContainer from './Components/SplitContainer';
import HeaderBar from './Components/HeaderBar';
import './styles.css';

/* 
    this is where i left off, now i need to work on a fetch request that can be used inside the useEffect()
    in the <AddPlace/> component
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