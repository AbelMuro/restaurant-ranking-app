import React, {useState, useEffect} from 'react';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import {ChangeTheme} from '~/Common/Functions';
import * as styles from './styles.module.css';

function Categories() {
    const [categories, setCategories] = useState<Array<string>>([]);
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const allRestaurants = useTypedSelector<Array<{latitude: number, longitude: number, name: string, city: string, country: string, category: string}>>(state => state.restaurant.allRestaurants)
    const search = useTypedSelector<string>(state => state.search.search);
    const [category, setCategory] = useState<string>('All');
    const dispatch = useTypedDispatch();

    const handleCategory = (category : string) => {
        setCategory(category);
    }

    const handleStyledCategory = (currentCategory : string) : Record<string, string> => {
        if(currentCategory === category)
            return {backgroundColor: theme === 'light' ? '#018801' : '#00bc00', color: 'white'};
        else
            return {};
    }

    useEffect(() => {
        let allCategories = allRestaurants.map((restaurant) => {
            return restaurant.category;
        });

        allCategories = [...new Set(allCategories)];
        setCategories(allCategories);

    }, [allRestaurants])

    useEffect(() => {
        dispatch({type: 'UPDATE_CATEGORY', payload: {category}});
    }, [category])

    return(
        <section className={styles.container}>
            {categories.length !== 0 && 
                <div 
                    className={ChangeTheme(styles, 'category', theme)} 
                    onClick={() => handleCategory('All')}
                    style={handleStyledCategory('All')}
                    >
                    All
                </div>}

            {
                categories.map((category) => {
                    return (            
                        <div 
                            className={ChangeTheme(styles, 'category', theme)} 
                            onClick={() => handleCategory(category)}
                            style={handleStyledCategory(category)}
                            >
                            {category}
                        </div>
                    );
                })
            }
        </section>
    )
}

export default Categories;