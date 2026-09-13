import React, {useState, useEffect} from 'react';
import SearchBar from '~/Common/Components/SearchBar';
import {useTypedSelector} from '~/Store';
import {ChangeTheme} from '~/Common/Functions';
import {motion, AnimatePresence} from 'framer-motion';
import icons from '../icons';
import * as styles from './styles.module.css';

function SearchDialog() {
    const [open, setOpen] = useState<boolean>(false);
    const theme = useTypedSelector<string>(state => state.theme.theme);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClose = (e: PointerEvent) => {
        const target = e.target as HTMLElement;

        if(!target.closest(`.${styles.dialog}`) && !target.closest(`.${styles.dialog_button}`))
            setOpen(false);
    }
    

    useEffect(() => {
        if(open)
            document.addEventListener('click', handleClose)
        else
            document.removeEventListener('click', handleClose);

        return () => {
            document.removeEventListener('click', handleClose)
        }

    }, [open])

    return(
        <>
            <button className={ChangeTheme(styles, 'dialog_button', theme)} onClick={handleOpen}>
                Search your places
            </button>
            <AnimatePresence>
                {open &&
                    <motion.dialog 
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        className={ChangeTheme(styles, 'dialog', theme)} 
                        open={true}>
                            <button className={styles.dialog_close} onClick={handleOpen}>
                                {
                                    theme === 'dark' ? 
                                    <img src={icons['lightClose']}/> : 
                                    <img src={icons['darkClose']}/>
                                }
                            </button>
                            <SearchBar/>
                    </motion.dialog>                  
                }                
            </AnimatePresence>

        </>

    )
};

export default SearchDialog;