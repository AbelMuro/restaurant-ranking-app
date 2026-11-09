import React, {SetStateAction, useMemo, Dispatch} from 'react';
import {ChangeTheme} from '~/Common/Functions'
import {Restaurants, Restaurant} from '~/Common/Types';
import { useTypedSelector } from '~/Store';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

type Props = {
    option: string
    setOption: Dispatch<SetStateAction<string>>
}

function RankedOrTryButtons({option, setOption} : Props) {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const allRestaurants = useTypedSelector<Restaurants>(state => state.restaurant.allRestaurants);

    const handleOption = (option: string) => {
        setOption(option);
    }

    const handleSelectedStyles = (currentOption : string) : Record<string, number> => {
        if(currentOption === option)
            return {fontWeight: 800}
        else
            return {};
    }

    const ranked = useMemo(() => {
        return allRestaurants.reduce((acc, restaurant) => {
            const rank = restaurant.rank;
            return rank !== null ? acc + 1 : acc;
        }, 0)   
    }, [allRestaurants]);

    const tryRest = useMemo(() => {
        return allRestaurants.reduce((acc, restaurant) => {
            const tryRest = restaurant.try;
            return tryRest ? acc + 1 : acc;
        }, 0)
    }, [allRestaurants])

    return(
        <div className={styles.container}>
            <button className={ChangeTheme(styles, 'button', theme)} onClick={() => handleOption('ranked')}>
                <span style={handleSelectedStyles('ranked')}>
                    Ranked
                </span> &nbsp;
                {ranked}
                {option === 'ranked' && <motion.div layoutId='underline' className={styles.underline}/>}
            </button>
            <button className={ChangeTheme(styles, 'button', theme)} onClick={() => handleOption('want to try')}>
                <span style={handleSelectedStyles('want to try')}>
                    Want to try
                </span> &nbsp;
                    {tryRest}
                {option === 'want to try' && <motion.div layoutId='underline' className={styles.underline}/>}
            </button>
            <hr/>
        </div>
    )
}

export default RankedOrTryButtons;