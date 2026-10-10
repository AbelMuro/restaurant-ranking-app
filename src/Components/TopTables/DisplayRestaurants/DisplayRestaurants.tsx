import React, {useEffect} from 'react';
import {useTypedSelector} from '~/Store';
import Buttons from './Buttons';
import AddPlaceInput from './AddPlaceInput';
import Categories from './Categories';
import Restaurant from './Restaurant';
import * as styles from './styles.module.css';

function DisplayRestaurants() {
    const allRestaurants = useTypedSelector<Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>>(state => state.location.markers.saved)


    return (
        <section className={styles.container}>
            <Buttons/>
            <Categories/>
            <AddPlaceInput/>
            {allRestaurants.map((restaurant, i) => {
                const title = restaurant.details.name;
                const city = restaurant.details.city;
                const visited = 1;
                const category = '';
                const topPick = false;
                const currency = '$';
                const address = '';
                
                return (
                    <Restaurant number={i + 1} title={title} city={city} visited={visited} category={category} topPick={topPick} currency={currency} address={address}/>
                )
            })}
        </section>
    )
}

export default DisplayRestaurants;