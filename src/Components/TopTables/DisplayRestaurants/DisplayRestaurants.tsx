import React, {useState, useMemo} from 'react';
import { useTypedSelector } from '~/Store';
import {useRestaurants} from '~/Common/Hooks';
import { Restaurant as RestaurantType } from '~/Common/Types';
import RankedOrTryButtons from './RankedOrTryButtons';
import AddPlaceInput from './AddPlaceInput';
import Categories from './Categories';
import Restaurant from './Restaurant';
import * as styles from './styles.module.css';


function DisplayRestaurants() {
    const [option, setOption] = useState<string>('ranked');
    const allRestaurants = useTypedSelector(state => state.restaurant.allRestaurants);
    const [displayRestaurants] = useRestaurants(allRestaurants);

    const currentRestaurants = useMemo(() => {
        if(option === 'ranked')
            return displayRestaurants.filter((restaurant : RestaurantType) => {
                return restaurant.rank !== Infinity;
            });
        else{
            return displayRestaurants.filter((restaurant: RestaurantType) => {
                return restaurant.try 
            })
        }
        
    }, [option, displayRestaurants])

    return (
        <section className={styles.container}>
            <RankedOrTryButtons option={option} setOption={setOption}/>
            <Categories/>
            <AddPlaceInput/>
            {currentRestaurants.map((restaurant, i) => {
                const latitude = restaurant.latitude;
                const longitude = restaurant.longitude;
                const title = restaurant.name;
                const city = restaurant.city;
                const country = restaurant.category;
                const visited = 1;
                const topPick = false;
                const currency = '$';
                
                return (
                    <Restaurant number={i + 1} title={title} city={city} visited={visited} category={country} topPick={topPick} currency={currency} latitude={latitude} longitude={longitude}/>
                )
            })}
        </section>
    )
}

export default DisplayRestaurants;