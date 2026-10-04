import React from 'react';
import { useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

function AddPlaceButton() {
    const dispatch = useTypedDispatch();

    const handleOpen = () => {
        dispatch({type: 'DISPLAY_INPUT'});
    }

    return (
            <button className={styles.place} onClick={handleOpen}>
                + Add a place
            </button>     
    )
}

export default AddPlaceButton;