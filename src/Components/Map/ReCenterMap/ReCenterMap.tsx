import React, {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import { Coordinates } from '~/Common/Types';

type Props = Coordinates;

function ReCenterMap({latitude, longitude} : Props) {
    const map = useMap();

    useEffect(() => {
        map.setView([latitude, longitude], 13);
    });

    return null;
}

export default ReCenterMap;