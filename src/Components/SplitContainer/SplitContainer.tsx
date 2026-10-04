import React from 'react';
import {useMediaQuery} from '~/Common/Hooks';
import {ChangeTheme} from '~/Common/Functions';
import { useTypedSelector } from '~/Store';
import Split from 'react-split';
import TopTables from '../TopTables';
import Map from '../Map';
import * as styles from './styles.module.css';

function SplitContainer() {
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const [mobile] = useMediaQuery('(max-width: 730px)');

    return (
        <Split
            key={mobile ? 'vertical' : 'horizontal'}
            className={ChangeTheme(styles, 'split-container', theme)}
            sizes={[30, 70]}
            minSize={[370, 200]}
            gutterAlign='center'
            snapOffset={50}
            dragInterval={20}
            direction={mobile ? 'vertical' : 'horizontal'}
            cursor={mobile ? 'row-resize' : "col-resize"}
        >
            <TopTables/>
            <Map/>
        </Split>            
    )
}

export default SplitContainer;