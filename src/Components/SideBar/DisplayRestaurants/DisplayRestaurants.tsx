import React, {useState, useMemo} from 'react';
import {motion} from 'framer-motion';
import { useTypedSelector } from '~/Store';
import {useRestaurants} from '~/Common/Hooks';
import { Restaurant as RestaurantType, Restaurants } from '~/Common/Types';
import RankedOrTryButtons from './RankedOrTryButtons';
import AddPlaceInput from './AddPlaceInput';
import Categories from './Categories';
import Restaurant from './Restaurant';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import DisplayDraggedItem from './DisplayDraggedItem';
import * as styles from './styles.module.css';

function DisplayRestaurants() {
    const [option, setOption] = useState<string>('ranked');
    const allRestaurants = useTypedSelector(state => state.restaurant.allRestaurants);
    const [displayRestaurants] = useRestaurants(allRestaurants);

    const currentRestaurants : Restaurants = useMemo(() => {
        if(option === 'ranked'){
            return displayRestaurants.filter((restaurant : RestaurantType) => {
                return restaurant.rank !== null;
            });            
        }

        else{
            return displayRestaurants.filter((restaurant: RestaurantType) => {
                return restaurant.try; 
            })
        }
    }, [option, displayRestaurants]);

    return (
        <motion.section className={styles.container} layout>
            <RankedOrTryButtons option={option} setOption={setOption}/>
            <Categories/>
            <AddPlaceInput/>
            <DndProvider backend={HTML5Backend}>
                {currentRestaurants.map((restaurant, i) => {
                    const key = `${restaurant.id} ${restaurant.rank}`

                    return (
                        <Restaurant {...restaurant} key={key}/>
                    )
                })}
                <DisplayDraggedItem/>
            </DndProvider>
        </motion.section>
    )
}

export default DisplayRestaurants;