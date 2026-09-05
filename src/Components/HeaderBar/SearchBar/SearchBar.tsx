import React, {useState, ChangeEvent} from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function SearchBar() {
    const [search, setSearch] = useState<string>('');

    const handleSearch = (e: ChangeEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        setSearch(value);
    }

    return(
        <form className={styles.form}>
            <img className={styles.search_icon} src={icons['magnifyingGlass']}/>
            <input type='search' className={styles.searchbar} value={search} onChange={handleSearch} name={'search'}/>
        </form>
    )
}

export default SearchBar;