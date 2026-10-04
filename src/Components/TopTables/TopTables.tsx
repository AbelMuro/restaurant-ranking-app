import React, {useEffect, memo} from 'react';
import {ChangeTheme} from '~/Common/Functions';
import RestaurantLocation from './RestaurantLocation';
import TotalRankedPlaces from './TotalRankedPlaces';
import DisplayRestaurants from './DisplayRestaurants';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import * as styles from './styles.module.css';

function TopTables() {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const showPosition : PositionCallback = (position) => {
       const lat = position.coords.latitude;
       const long = position.coords.longitude
       dispatch({type: 'UPDATE_LOCATION', payload: {latitude: lat, longitude: long}});
    }

    const showError : PositionErrorCallback = (error) => {
        switch(error.code){
            case error.PERMISSION_DENIED:
                console.log('User denied access to their location')
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('Current location is unavailable')
                break;
            case error.TIMEOUT:
                console.log('Timeout');
                break;
        }
    }

    useEffect(() => {
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(showPosition, showError)
    }, [])

    return (
        <aside className={ChangeTheme(styles, 'container', theme)}>
            <section className={styles.misc}>
                <RestaurantLocation/>
                <TotalRankedPlaces/>                
            </section>
            <h1 className={ChangeTheme(styles, 'title', theme)}>
                Your top tables
            </h1>
            <p className={ChangeTheme(styles, 'desc', theme)}>
                Ranked head-to-head, so your #3 is better than your #4 -- no five-star mush.
            </p>
            <DisplayRestaurants/>
        </aside>
    )
}

export default memo(TopTables);