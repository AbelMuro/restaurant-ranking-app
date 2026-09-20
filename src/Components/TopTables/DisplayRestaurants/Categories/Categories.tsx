import React, {useState} from 'react';
import {useTypedSelector} from '~/Store';
import {ChangeTheme} from '~/Common/Functions';
import * as styles from './styles.module.css';

function Categories() {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const [category, setCategory] = useState<string>('All');

    const handleCategory = (category : string) => {
        setCategory(category);
    }

    const handleStyledCategory = (currentCategory : string) : Record<string, string> => {
        if(currentCategory === category)
            return {backgroundColor: '#02b002', color: 'white'};
        else
            return {};
    }

    return(
        <section className={styles.container}>
            <div 
                className={ChangeTheme(styles, 'category', theme)} 
                onClick={() => handleCategory('All')}
                style={handleStyledCategory('All')}
                >
                All
            </div>
            <div 
                className={ChangeTheme(styles, 'category', theme)} 
                onClick={() => handleCategory('British')}
                style={handleStyledCategory('British')}
                >
                British
            </div>
            <div 
                className={ChangeTheme(styles, 'category', theme)} 
                onClick={() => handleCategory('Spanish')}
                style={handleStyledCategory('Spanish')}
                >
                Spanish
            </div>
            <div 
                className={ChangeTheme(styles, 'category', theme)} 
                onClick={() => handleCategory('Italian')}
                style={handleStyledCategory('Italian')}
                >
                Italian
            </div>
            <div 
                className={ChangeTheme(styles, 'category', theme)} 
                onClick={() => handleCategory('European')}
                style={handleStyledCategory('European')}
                >
                European
            </div>
        </section>
    )
}

export default Categories;