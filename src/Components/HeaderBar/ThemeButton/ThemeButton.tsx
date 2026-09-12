import React, {useEffect} from 'react';
import {ChangeTheme} from '~/Common/Functions'
import {motion, AnimatePresence} from 'framer-motion';
import { useTypedDispatch, useTypedSelector } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function ThemeButton() {
    const dispatch = useTypedDispatch();
    const theme = useTypedSelector<string>(state => state.theme.theme)

    const handleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch({type: 'CHANGE_THEME', payload: {theme: newTheme}});
        localStorage.setItem('theme', newTheme);
    }


    return (
        <button className={ChangeTheme(styles, 'theme', theme)} onClick={handleTheme}>
            <AnimatePresence>
                {
                    theme === 'dark' ? 
                    <motion.img 
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        className={styles.theme_icon} 
                        src={icons['lightSun']}/> :
                    <motion.img 
                        className={styles.theme_icon} 
                        src={icons['darkMoon']}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        />
                }
            </AnimatePresence>
        </button>
    )
}

export default ThemeButton;