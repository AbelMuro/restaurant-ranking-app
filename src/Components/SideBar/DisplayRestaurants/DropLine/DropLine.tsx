import React, {useState, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import * as styles from './styles.module.css';

function DropLine() {
    const [hover, setHover] = useState<boolean>(false);
    const [{isOver}, drop] = useDrop({
        accept: 'restaurant',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    useEffect(() => {
        if(isOver)
            setHover(true);
        else
            setHover(false);
    }, [isOver])

    return (
        <div className={styles.line} style={hover ? {opacity: 1} : {opacity: 0}} ref={(ref) => {drop(ref)}}>
        </div>
    );
}

export default DropLine;