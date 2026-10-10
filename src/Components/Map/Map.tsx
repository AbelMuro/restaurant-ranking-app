import React, {memo, useState, useEffect} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icons from './icons';
import * as styles from './styles.module.css';

function Map() {
    const [map, setMap] = useState<ReturnType<typeof L.map>>();
    const {latitude, longitude} = useTypedSelector<{latitude: number, longitude: number}>(state => state.location.user);
    const tempMarkers = useTypedSelector<Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>>(state => state.location.markers.temp);
    const savedMarkers = useTypedSelector<Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>>(state => state.location.markers.saved);
    const dispatch = useTypedDispatch();

    const addLayerToMap = () => {
        if(!map) return;
        
        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {maxZoom: 19}
        ).addTo(map);

        map.trackResize = true;
    }

    const addTempMarkerToMap = (lat: number, long: number, details : {name: string, city: string, country: string}) => {
        const icon = L.icon({
            iconUrl: icons[`tempMarker`],
            iconSize: [40, 48],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        const marker = L.marker([lat, long], {icon, details, type: 'temp'});
        marker.addTo(map);
        marker.on('click', (e: MouseEvent) => {
            const markerElement = e.target as L.Marker;
            const details = markerElement.options.details;
            const {lat, lng} = markerElement.getLatLng();
            dispatch({type: 'CREATE_SAVED_MARKER', payload: {latitude: lat, longitude: lng, details: {name: details.name, city: details.city, country: details.country}}});
            dispatch({type: 'CLEAR_TEMP_MARKERS'});
        });
    }

    const addSavedMarkerToMap = (lat: number, long: number) => {
        const icon = L.icon({
            iconUrl: icons[`savedMarker`],
            iconSize: [40, 48],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        const marker = L.marker([lat, long], {icon, type: 'saved'});
        marker.addTo(map);
    }

    const removeTempMarkersFromMap = () => {
        map.eachLayer((layer : any) => {
            if(!(layer instanceof L.Marker)) return;
            if(layer.options.type !== 'temp') return;
                
            layer.remove();
        })
    }

    useEffect(() => {
        if(!map) return;

        if(!tempMarkers.length)
            return removeTempMarkersFromMap();

        tempMarkers.forEach((marker) => {
            const lat = marker.latitude;
            const lon = marker.longitude;
            const details = marker.details;
            addTempMarkerToMap(lat, lon, details);
        })
    }, [tempMarkers, map]);

    useEffect(() => {
        if(!map) return;
        savedMarkers.forEach((marker) => {
            const lat = marker.latitude;
            const lon = marker.longitude;
            addSavedMarkerToMap(lat, lon);
        })
    }, [savedMarkers, map])

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