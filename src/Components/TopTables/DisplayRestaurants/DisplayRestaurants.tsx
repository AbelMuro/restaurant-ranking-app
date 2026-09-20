import React from 'react';
import Buttons from './Buttons';
import Categories from './Categories';
import Restaurant from './Restaurant';
import * as styles from './styles.module.css';

function DisplayRestaurant() {
    return (
        <section className={styles.container}>
            <Buttons/>
            <Categories/>
            <Restaurant/>
        </section>
    )
}

export default DisplayRestaurant;