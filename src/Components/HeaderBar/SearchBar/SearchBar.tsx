import React, {useEffect, ChangeEvent, useDeferredValue} from 'react';
import { useTypedDispatch, useTypedSelector } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function SearchBar() {
    const dispatch = useTypedDispatch();
    const search = useTypedSelector<string>(state => state.search.search);
    const deferredSearch = useDeferredValue(search);

    const handleSearch = (e: ChangeEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        dispatch({type: 'UPDATE_SEARCH', payload: {search: value}});
    };


    useEffect(() => {
        console.log('deferred search');
    }, [deferredSearch])

    return(
        <form className={styles.form}>
            <img className={styles.search_icon} src={icons['magnifyingGlass']}/>
            <input type='search' className={styles.searchbar} value={search} onChange={handleSearch} name={'search'}/>
        </form>
    )
}

export default SearchBar;