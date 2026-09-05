import React from 'react';
import SearchBar from './SearchBar';
import * as styles from './styles.module.css';

function HeaderBar() {
    return(
        <header className={styles.header}>
            <p className={styles.header_logo}>
                Tastemap.
            </p>
            <div className={styles.header_group}>
                <SearchBar/>
            </div>
        </header>
    )
};

export default HeaderBar;