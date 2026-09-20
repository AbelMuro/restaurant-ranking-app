import React, {useState} from 'react';
import {ChangeTheme} from '~/Common/Functions'
import { useTypedSelector } from '~/Store';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

function Buttons() {
    const [option, setOption] = useState<string>('ranked');
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const ranked = useTypedSelector<number>(state => state.restaurant.ranked)
    const total = useTypedSelector<number>(state => state.restaurant.total);

    const handleOption = (option: string) => {
        setOption(option);
    }

    const handleSelectedStyles = (currentOption : string) : Record<string, number> => {
        if(currentOption === option)
            return {fontWeight: 800}
        else
            return {};
    }

    return(
        <div className={styles.container}>
            <button className={ChangeTheme(styles, 'button', theme)} onClick={() => handleOption('ranked')}>
                <span style={handleSelectedStyles('ranked')}>
                    Ranked
                </span> &nbsp;
                9
                {option === 'ranked' && <motion.div layoutId='underline' className={styles.underline}/>}
            </button>
            <button className={ChangeTheme(styles, 'button', theme)} onClick={() => handleOption('want to try')}>
                <span style={handleSelectedStyles('want to try')}>
                    Want to try
                </span> &nbsp;
                    3
                {option === 'want to try' && <motion.div layoutId='underline' className={styles.underline}/>}
            </button>
            <hr/>
        </div>
    )
}

export default Buttons;