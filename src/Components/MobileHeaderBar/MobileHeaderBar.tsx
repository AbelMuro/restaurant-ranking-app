import React, {useState} from 'react';
import SearchDialog from './SearchDialog';
import {motion, AnimatePresence} from 'framer-motion';
import icons from './icons';
import {ChangeTheme} from '~/Common/Functions';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

function MobileHeaderBar() {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useTypedDispatch();

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        dispatch({type: 'CHANGE_THEME', payload: {theme: newTheme}});
    }

    const handleRefresh = () => {

    }

    return (
        <>
            <motion.header 
                initial={{y: -100}}
                animate={{y: 0}}
                className={ChangeTheme(styles, 'bar', theme)}>
                <button className={styles.bar_button} onClick={handleOpen}>
                    {
                        theme === 'dark' ? 
                            <img className={styles.bar_icon} src={icons['lightBars']}/> :
                            <img className={styles.bar_icon} src={icons['darkBars']}/>
                    }
                </button>
            </motion.header>   
            <AnimatePresence>
                {open && 
                    <motion.div 
                        className={styles.overlay}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {when: 'beforeChildren'}}}
                        exit={{opacity: 0, transition: {when: 'afterChildren'}}}
                        >
                            <motion.aside 
                                className={ChangeTheme(styles, 'menu', theme)}
                                initial={{clipPath: 'circle(30px at top left)'}}
                                animate={{clipPath: 'circle(100%)', transition: {duration: 0.6}}}
                                exit={{clipPath: 'circle(30px at top left)'}}
                                >   
                                    <button className={styles.menu_close} onClick={handleOpen}>
                                        {
                                            theme === 'light' ? 
                                                <img src={icons['darkClose']}/> :
                                                <img src={icons['lightClose']}/> 
                                        }
                                    </button>
                                    <ul className={styles.menu_links}>
                                        <li className={styles.menu_link}>
                                            <SearchDialog/>
                                        </li>
                                        <li className={ChangeTheme(styles, 'menu_link', theme)} onClick={handleTheme}>
                                            <button onClick={handleTheme}>
                                                Change Theme
                                            </button>
                                        </li>
                                        <li className={ChangeTheme(styles, 'menu_link', theme)} onClick={handleRefresh}>
                                            <button>
                                                Refresh
                                            </button>
                                        </li>
                                    </ul>
                            </motion.aside>

                    </motion.div>}                
            </AnimatePresence>    
        </>

    )
}

export default MobileHeaderBar;