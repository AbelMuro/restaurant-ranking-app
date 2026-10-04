import React from 'react';
import Buttons from './Buttons';
import AddPlace from './AddPlace';
import Categories from './Categories';
import Restaurant from './Restaurant';
import * as styles from './styles.module.css';

function DisplayRestaurant() {
    const allRestaurants = [
        {title: 'Brat', city: 'Shoreditch', visited: 1, category: 'BASQUE', topPick: true, currency: '$', address: 'basque'},
        {title: 'Organic', city: 'San Pablo', visited: 3, category: 'ITALIAN', topPick: false, currency: '$', address: 'italian'}
    ];

    return (
        <section className={styles.container}>
            <Buttons/>
            <Categories/>
            <AddPlace/>
            {allRestaurants.map((restaurant, i) => {
                const title = restaurant.title;
                const city = restaurant.city;
                const visited = restaurant.visited;
                const category = restaurant.category;
                const topPick = restaurant.topPick;
                const currency = restaurant.currency;
                const address = restaurant.address;
                
                return (
                    <Restaurant number={i + 1} title={title} city={city} visited={visited} category={category} topPick={topPick} currency={currency} address={address}/>
                )
            })}
        </section>
    )
}

export default DisplayRestaurant;