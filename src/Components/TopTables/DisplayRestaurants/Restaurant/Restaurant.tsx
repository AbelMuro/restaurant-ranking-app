import React, {useState, MouseEvent} from 'react';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import {Restaurant} from '~/Common/Types';
import RightClickMenu from '~/Common/Components/RightClickMenu';
import {ChangeTheme} from '~/Common/Functions';
import * as styles from './styles.module.css';

function Restaurants({id, latitude, longitude, name, city, country, category, rank, try : tryRest} : Restaurant ) {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const {latitude : selectedLat, longitude: selectedLon} = useTypedSelector<{latitude: number, longitude: number}>(state => state.restaurant.selectedRestaurant);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'UPDATE_RESTAURANT', payload: {latitude, longitude}});
        dispatch({type: 'UPDATE_CENTER', payload: {latitude, longitude}});
    }

    const handleDescendingColor = () : Record<string, string>=> {
        return theme === 'light' ? {color: `hsl(0 0% calc(${rank} * 10%))`} : {color: `hsl(0 0% ${100 - (rank * 10)}%)`}
    }

    const handleSelectedStyles = () : Record<string, string> => {
        if(longitude === selectedLon && latitude === selectedLat)
            return theme === 'light' ? 
                    {backgroundColor: 'rgba(249, 162, 0, 0.2)', borderColor: 'rgba(166, 108, 0, 0.5)'} : 
                    {backgroundColor: 'rgba(249, 162, 0, 0.4)', borderColor: 'rgba(166, 108, 0, 0.7)'}
        else
            return {backgroundColor: '', borderColor: ''};    
    }

    const handleSelectedNumberStyles = () : Record<string, string> => {
        if(longitude === selectedLon && latitude === selectedLon)
            return theme === 'light' ? {color: 'rgb(0, 119, 0)'} : {color: '#00ce00'};
        else
            return {};
    }


    return(
        <RightClickMenu restaurantId={id}>
            <article className={styles.restaurant} style={handleSelectedStyles()} onClick={handleClick}>
                {!tryRest && <p className={styles.restaurant_number} style={handleDescendingColor()}>
                    <span style={handleSelectedNumberStyles()}>{rank}</span>
                </p>}
                <div className={styles.restaurant_image}></div>
                <h2 className={ChangeTheme(styles, 'restaurant_title', theme)}>
                    {name}
                </h2>
                <div className={styles.restaurant_category}>
                    {category}
                </div>
                <p className={ChangeTheme(styles, 'restaurant_city', theme)}>
                    {city} - been {1}x
                </p>
                <div className={ChangeTheme(styles, 'restaurant_currency', theme)}>
                    $$$$
                </div>
                {false && <p className={ChangeTheme(styles, 'restaurant_toppick', theme)}>
                    Top Pick
                </p>}
            </article>            
        </RightClickMenu>

    )
    
}

export default Restaurants;