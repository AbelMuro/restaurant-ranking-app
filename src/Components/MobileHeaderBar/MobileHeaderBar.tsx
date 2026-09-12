import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import icons from './icons';
import {ChangeTheme} from '~/Common/Functions';
import { useTypedSelector } from '~/Store';
import * as styles from './styles.module.css';

function MobileHeaderBar() {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(!open);
    }
    


    return (
        <>
            <header className={ChangeTheme(styles, 'bar', theme)}>
                <button className={styles.bar_button} onClick={handleOpen}>
                    {
                        theme === 'dark' ? 
                            <img className={styles.bar_icon} src={icons['lightBars']}/> :
                            <img className={styles.bar_icon} src={icons['darkBars']}/>
                    }

                </button>
            </header>   
            <AnimatePresence>
                {open && 
                    <motion.div 
                        className={styles.overlay}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        >
                            <motion.aside className={ChangeTheme(styles, 'menu', theme)}>
                                
                            </motion.aside>

                    </motion.div>}                
            </AnimatePresence>    
        </>

    )
}

export default MobileHeaderBar;