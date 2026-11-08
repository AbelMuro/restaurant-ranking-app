import React, {ReactNode, MouseEvent, useState, useRef, useEffect} from 'react';
import * as styles from './styles.module.css';

type Props = {
    children: ReactNode
}

function RightClickMenu({children}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault();
        setOpen(true);
    }


    return (
        <section className={styles.container} onContextMenu={handleRightClick}>
            {children}
            {open && <div className={styles.contextMenu}>
                <button className={styles.option}>
                    Select Rank for Restaurant?
                </button>
            </div>}
        </section>
    )
}

export default RightClickMenu;