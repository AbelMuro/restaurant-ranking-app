import React from 'react';
import * as styles from './styles.module.css';

function AddPlaceButton() {
    return (
        <button className={styles.place}>
            + Add a place
        </button>
    )
}

export default AddPlaceButton;