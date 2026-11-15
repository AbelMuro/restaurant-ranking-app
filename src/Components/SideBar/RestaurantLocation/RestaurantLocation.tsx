import React from 'react';
import {ChangeTheme} from '~/Common/Functions';
import { useTypedSelector } from '~/Store';
import * as styles from './styles.module.css';

function RestaurantLocation() {
    const theme = useTypedSelector<string>(state => state.theme.theme);

    return (
        <div className={ChangeTheme(styles, 'container', theme)}>
            <div className={styles.dot}/>
            London
        </div>
    )
}

export default RestaurantLocation;