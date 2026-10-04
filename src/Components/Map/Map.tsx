import React, {memo, useState, useEffect} from 'react';
import { useTypedSelector } from '~/Store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icons from './icons';
import * as styles from './styles.module.css';

function Map() {
    const [map, setMap] = useState<ReturnType<typeof L.map>>();
    const {latitude, longitude} = useTypedSelector<{latitude: number, longitude: number}>(state => state.location.user);
    const tempMarkers = useTypedSelector<Array<{latitude: number, longitude: number}>>(state => state.location.markers.temp);

    const addLayerToMap = () => {
        if(!map) return;
        
        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {maxZoom: 19}
        ).addTo(map);

        map.trackResize = true;
    }

    const addMarkersToMap = (lat: number, long: number, type : string) => {
        const icon = L.icon({
            iconUrl: icons[`${type}Marker`],
            iconSize: [40, 48],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        L.marker([lat, long], {icon}).addTo(map).on('click', (e: MouseEvent) => {
            const markerElement = e.target as L.Marker;
            const latLng = markerElement.getLatLng();
            console.log(latLng);
        });
    }

    useEffect(() => {
        tempMarkers.forEach((marker) => {
            const lat = marker.latitude;
            const lon = marker.longitude
            addMarkersToMap(lat, lon, 'temp');
        })
    }, [tempMarkers])

    useEffect(() => {
        setMap(L.map('map', {
            center: [0, 0],
            zoom: 13
        }))
    }, [])

    useEffect(() => {
        if(!map) return;

        addLayerToMap();
    }, [map])

    useEffect(() => {
        if(!map) return;

        map.panTo({lat: latitude, lng: longitude});
    }, [map, latitude, longitude])

    return(
        <section id='map' className={styles.container}/>
    )
}

export default memo(Map);