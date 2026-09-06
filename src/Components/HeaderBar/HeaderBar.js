import React from 'react';
import SearchBar from './SearchBar';
import ThemeButton from './ThemeButton';
import * as styles from './styles.module.css';

function HeaderBar() {
    return(
        <header className={styles.header}>
            <p className={styles.header_logo}>
                Tastemap.
            </p>
            <div className={styles.header_group}>
                <SearchBar/>
                <ThemeButton/>
            </div>
        </header>
    )
};

export default HeaderBar;