import {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {useTypedSelector} from '~/Store';
import {Restaurants} from '~/Common/Types';

export default function useRestaurants(allRestaurants : Restaurants) : [Restaurants, Dispatch<SetStateAction<Restaurants>>]{
    const [displayRestaurants, setDisplayRestaurants] = useState<Restaurants>(allRestaurants);
    const search = useTypedSelector<string>(state => state.search.search);
    const category = useTypedSelector<string>(state => state.restaurant.selectedCategory);


    const filterSearch = (restaurants: Restaurants) : Restaurants => {
        return restaurants.filter((restaurant) => {
            const name = restaurant.name.toLowerCase().replaceAll(/[^a-zA-Z]/g, '');
            const city = restaurant.city.toLowerCase();
            const country = restaurant.city.toLowerCase();

            return name.startsWith(search.toLowerCase()) || city.startsWith(search.toLowerCase()) || country.startsWith(search.toLowerCase());
        });
    }

    const filterCategory = (restaurants: Restaurants) => {
        return restaurants.filter((restaurant) => {
            return restaurant.category === category
        });
    }

    useEffect(() => {
        if(!search) {
            if(category === 'All')
                return setDisplayRestaurants(allRestaurants);
            else
                return setDisplayRestaurants(filterCategory(allRestaurants));
        };
    
        let filteredRestaurants : Restaurants = [];
        
        if(category === 'All')
            filteredRestaurants = filterSearch(allRestaurants);
        else
            filteredRestaurants = filterSearch(filterCategory(allRestaurants))

        setDisplayRestaurants(filteredRestaurants);
    }, [search, allRestaurants]);

    useEffect(() => {
        if(category === 'All') {
            if(!search)
                return setDisplayRestaurants(allRestaurants);
            else
                return setDisplayRestaurants(filterSearch(allRestaurants));
        }

        let restaurants : Restaurants = [];
        if(!search)
            restaurants = filterCategory(allRestaurants);
        else
            restaurants = filterCategory(filterSearch(allRestaurants));

        setDisplayRestaurants(restaurants);
    }, [category]);


    return [displayRestaurants, setDisplayRestaurants];
}