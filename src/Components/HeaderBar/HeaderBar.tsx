import React from 'react';
import {useMediaQuery} from '~/Common/Hooks';
import MobileHeaderBar from '../MobileHeaderBar';
import { useTypedSelector } from '~/Store';
import { ChangeTheme } from '~/Common/Functions';
import SearchBar from '~/Common/Components/SearchBar';
import ThemeButton from './ThemeButton';
import RefreshButton from './RefreshButton';
import AddPlaceButton from './AddPlaceButton';
import * as styles from './styles.module.css';

function HeaderBar() {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const [mobile] = useMediaQuery('(max-width: 650px)');

    return mobile ? <MobileHeaderBar/> : 
        <header className={ChangeTheme(styles, 'header', theme)}>
            <p className={ChangeTheme(styles, 'header_logo', theme)}>
                Tastemap.
            </p>
            <div className={styles.header_group}>
                <SearchBar/>
                <ThemeButton/>
                <RefreshButton/>
                <AddPlaceButton/>
            </div>
        </header>
        

    
};

export default HeaderBar;