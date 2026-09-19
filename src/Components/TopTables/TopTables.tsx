import React from 'react';
import {ChangeTheme} from '~/Common/Functions';
import RestaurantLocation from './RestaurantLocation';
import TotalRankedPlaces from './TotalRankedPlaces';
import DisplayRestaurant from './DisplayRestaurants';
import {useTypedSelector} from '~/Store';
import * as styles from './styles.module.css';

function TopTables() {
    const theme = useTypedSelector<string>(state => state.theme.theme);

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
            <DisplayRestaurant/>
        </aside>
    )
}

export default TopTables