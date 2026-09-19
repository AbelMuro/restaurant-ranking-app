import React from 'react';
import { useTypedSelector } from '~/Store';
import * as styles from './styles.module.css';

function TotalRankedPlaces() {
    const total = useTypedSelector<number>(state => state.restaurant.total);
    const ranked = useTypedSelector<number>(state => state.restaurant.ranked);

    return (
        <p className={styles.places}>
            12 places &middot; 9 ranked
        </p>
    )
}

export default TotalRankedPlaces;