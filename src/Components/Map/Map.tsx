import React, {memo, useState, useEffect} from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function Map() {
    const [map, setMap] = useState<ReturnType<typeof L.map>>();

    const addLayerToMap = () => {
        if(!map) return;
        
        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {maxZoom: 19}
        ).addTo(map);

        map.trackResize = true;
    }

    const addMarkersToMap = (lat: number, long: number) => {
        const icon = L.icon({
            iconUrl: icons['marker'],
            iconSize: [40, 48],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        L.marker([lat, long], {icon}).addTo(map)
    }

    useEffect(() => {
        setMap(L.map('map', {
            center: [0, 0],
            zoom: 13
        }))
    }, [])

    useEffect(() => {
        if(!map) return;

        addLayerToMap();
        addMarkersToMap(10, 23)
    }, [map])

    return(
        <section id='map' className={styles.container}/>
    )
}

export default Map;