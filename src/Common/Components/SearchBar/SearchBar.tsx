import React, {useEffect, ChangeEvent, useDeferredValue, useState} from 'react';
import { ChangeTheme } from '~/Common/Functions';
import { useTypedDispatch, useTypedSelector } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function SearchBar() {
    const dispatch = useTypedDispatch();
    const [search, setSearch] = useState<string>('');
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const deferredSearch = useDeferredValue<string>(search);

    const handleSearch = (e: ChangeEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        setSearch(value);
    };

    useEffect(() => {
        dispatch({type: 'UPDATE_SEARCH', payload: {search: deferredSearch}});
    }, [deferredSearch])

    return(
        <form className={styles.form}>
            <img className={styles.search_icon} src={icons['magnifyingGlass']}/>
            <input 
                type='search' 
                className={ChangeTheme(styles, 'searchbar', theme)} 
                value={search} 
                onChange={handleSearch} 
                name={'search'}
                placeholder={'Search your places'}
                />
        </form>
    )
}

export default SearchBar;