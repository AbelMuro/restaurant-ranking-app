import React from 'react';
import { useTypedSelector } from '~/Store';
import {useRestaurants} from '~/Common/Hooks';
import Buttons from './Buttons';
import AddPlaceInput from './AddPlaceInput';
import Categories from './Categories';
import Restaurant from './Restaurant';
import * as styles from './styles.module.css';


function DisplayRestaurants() {
    const allRestaurants = useTypedSelector(state => state.restaurant.allRestaurants);
    const [displayRestaurants] = useRestaurants(allRestaurants);

    return (
        <section className={styles.container}>
            <Buttons/>
            <Categories/>
            <AddPlaceInput/>
            {displayRestaurants.map((restaurant, i) => {
                const latitude = restaurant.latitude;
                const longitude = restaurant.longitude;
                const title = restaurant.name;
                const city = restaurant.city;
                const country = restaurant.category;
                const visited = 1;
                const topPick = false;
                const currency = '$';
                
                return (
                    <Restaurant number={i + 1} title={title} city={city} visited={visited} category={country} topPick={topPick} currency={currency} latitude={latitude} longitude={longitude}/>
                )
            })}
        </section>
    )
}

export default DisplayRestaurants;