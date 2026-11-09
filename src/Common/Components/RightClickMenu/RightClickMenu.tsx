import React, {ReactNode, MouseEvent, useState, useRef, useEffect} from 'react';
import { useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    children: ReactNode,
    restaurantId: string
}

function RightClickMenu({children, restaurantId}: Props) {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const dispatch = useTypedDispatch();

    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault();
        setOpenMenu(true);
    }

    const handleClick = (e: PointerEvent)=> {
        setOpenMenu(false);
    }
    
    const handleRestaurant = () => {
        dispatch({type: 'RANK_RESTAURANT', payload: {id: restaurantId}});
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])


    return (
        <>
            <section className={styles.container} onContextMenu={handleRightClick}>
                {children}
                {openMenu && <div className={styles.contextMenu}>
                    <button className={styles.option} onClick={handleRestaurant}>
                        Move to Ranked Restaurants?
                    </button>
                </div>}
            </section>    
        </>

    )
}

export default RightClickMenu;