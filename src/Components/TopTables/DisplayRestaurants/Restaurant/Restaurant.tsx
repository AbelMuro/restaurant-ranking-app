import React from 'react';
import * as styles from './styles.module.css';

function Restaurant() {
    


    return (
        <article className={styles.container}>
            <p className={styles.restaurant_number}>
                1
            </p>
            <div className={styles.restaurant_image}></div>
            <h2 className={styles.restaurant_title}>
                Brat
            </h2>
            <div className={styles.restaurant_category}>
                BASQUE
            </div>
            <p className={styles.restaurant_city}>
                Shoreditch - been 3x
            </p>
            <div className={styles.restaurant_currency}>
                $$$$
            </div>
        </article>
    )
}

export default Restaurant;