import React from 'react';
import { ChangeTheme } from '~/Common/Functions';
import { useTypedSelector } from '~/Store';
import * as styles from './styles.module.css';

function TotalRankedPlaces() {
    const total = useTypedSelector<number>(state => state.restaurant.total);
    const ranked = useTypedSelector<number>(state => state.restaurant.ranked);
    const theme = useTypedSelector<string>(state => state.theme.theme);

    return (
        <p className={ChangeTheme(styles, 'places', theme)}>
            12 places &middot; 9 ranked
        </p>
    )
}

export default TotalRankedPlaces;