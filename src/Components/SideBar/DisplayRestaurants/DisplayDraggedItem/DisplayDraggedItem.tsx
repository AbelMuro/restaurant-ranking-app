import React from 'react';
import { useTypedSelector } from '~/Store';
import { ChangeTheme } from '~/Common/Functions';
import {useDragLayer} from 'react-dnd';
import * as styles from './styles.module.css';

function DisplayDraggedItem() {
    const theme = useTypedSelector(state => state.theme.theme);
    const {item, currentOffset, isDragging} = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset()
    }));

    if(!isDragging) return null;

    const {try: tryRest, rank, name, category, city} = item;


    return (
        <div className={styles.container} style={{left: currentOffset?.x, top: currentOffset?.y}}>
            <article className={styles.restaurant}>
                {!tryRest && 
                    <p className={styles.restaurant_number}>
                        <span >{rank}</span>
                    </p>}
                <div className={styles.restaurant_image}></div>
                <h2 className={ChangeTheme(styles, 'restaurant_title', theme)}>
                    {name}
                </h2>
                <div className={styles.restaurant_category}>
                    {category}
                </div>
                <p className={ChangeTheme(styles, 'restaurant_city', theme)}>
                    {city} - been {1}x
                </p>
                <div className={ChangeTheme(styles, 'restaurant_currency', theme)}>
                    $$$$
                </div>
                {false && <p className={ChangeTheme(styles, 'restaurant_toppick', theme)}>
                    Top Pick
                </p>}
            </article> 
        </div>
    )
}

export default DisplayDraggedItem;