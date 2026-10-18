import React, {useEffect} from 'react';
import {useMap} from 'react-leaflet';

type Props = {
    latitude: number,
    longitude: number
};

function ReCenterMap({latitude, longitude} : Props) {
    const map = useMap();

    useEffect(() => {
        map.setView([latitude, longitude], 13);
    });

    return null;
}

export default ReCenterMap;