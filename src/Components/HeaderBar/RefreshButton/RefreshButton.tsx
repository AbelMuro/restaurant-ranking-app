import React from 'react';
import { useTypedSelector } from '~/Store';
import icons from './icons';
import {ChangeTheme} from '~/Common/Functions';
import * as styles from './styles.module.css';

function RefreshButton() {
    const theme = useTypedSelector<string>(state => state.theme.theme); 

    return(
        <button className={ChangeTheme(styles, 'refresh', theme)}>
            {
                theme === 'dark' ? 
                    <img className={styles.refresh_icon} src={icons['lightRefresh']} /> : 
                    <img className={styles.refresh_icon} src={icons['darkRefresh']} />
            }
        </button>
    )
}

export default RefreshButton;