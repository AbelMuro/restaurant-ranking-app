import React, {useState} from 'react';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import {ChangeTheme} from '~/Common/Functions';
import * as styles from './styles.module.css';

type Props = {
    title: string,
    category: string,
    city: string,
    currency: string,
    visited: number,
    topPick: boolean,
    longitude: number,
    latitude: number,
    number: number
}


function Restaurants({title, category, city, currency, visited, topPick, longitude, latitude, number} : Props) {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const {latitude : selectedLat, longitude: selectedLon} = useTypedSelector<{latitude: number, longitude: number}>(state => state.restaurant.currentRestaurant);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'UPDATE_RESTAURANT', payload: {latitude, longitude}});
        dispatch({type: 'UPDATE_CENTER', payload: {latitude, longitude}});
    }

    const handleDescendingColor = () : Record<string, string>=> {
        return theme === 'light' ? {color: `hsl(0 0% calc(${number} * 10%))`} : {color: `hsl(0 0% ${100 - (number * 10)}%)`}
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
        <article className={styles.restaurant} style={handleSelectedStyles()} onClick={handleClick}>
            <p className={styles.restaurant_number} style={handleDescendingColor()}>
                <span style={handleSelectedNumberStyles()}>{number}</span>
            </p>
            <div className={styles.restaurant_image}></div>
            <h2 className={ChangeTheme(styles, 'restaurant_title', theme)}>
                {title}
            </h2>
            <div className={styles.restaurant_category}>
                {category}
            </div>
            <p className={ChangeTheme(styles, 'restaurant_city', theme)}>
                {city} - been {visited}x
            </p>
            <div className={ChangeTheme(styles, 'restaurant_currency', theme)}>
                $$$$
            </div>
            {topPick && <p className={ChangeTheme(styles, 'restaurant_toppick', theme)}>
                Top Pick
            </p>}
        </article>
    )
    
}

export default Restaurants;