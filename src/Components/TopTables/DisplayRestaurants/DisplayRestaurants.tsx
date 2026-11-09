import React, {useState, useMemo} from 'react';
import { useTypedSelector } from '~/Store';
import {useRestaurants} from '~/Common/Hooks';
import { Restaurant as RestaurantType, Restaurants } from '~/Common/Types';
import RankedOrTryButtons from './RankedOrTryButtons';
import AddPlaceInput from './AddPlaceInput';
import Categories from './Categories';
import Restaurant from './Restaurant';
import * as styles from './styles.module.css';


function DisplayRestaurants() {
    const [option, setOption] = useState<string>('ranked');
    const allRestaurants = useTypedSelector(state => state.restaurant.allRestaurants);
    const [displayRestaurants] = useRestaurants(allRestaurants);

    const currentRestaurants : Restaurants = useMemo(() => {
        if(option === 'ranked')
            return displayRestaurants.filter((restaurant : RestaurantType) => {
                return restaurant.rank !== null;
            });
        else{
            return displayRestaurants.filter((restaurant: RestaurantType) => {
                return restaurant.try; 
            })
        }
    }, [option, displayRestaurants]);

    return (
        <section className={styles.container}>
            <RankedOrTryButtons option={option} setOption={setOption}/>
            <Categories/>
            <AddPlaceInput/>
            {currentRestaurants.map((restaurant, i) => {
                return (
                    <Restaurant {...restaurant}/>
                )
            })}
        </section>
    )
}

export default DisplayRestaurants;