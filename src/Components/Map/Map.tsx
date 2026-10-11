import React, {memo} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icons from './icons';
import * as styles from './styles.module.css';
import { Icon } from 'leaflet';

function Map() {
    const {latitude, longitude} = useTypedSelector<{latitude: number, longitude: number}>(state => state.location.user);
    const tempMarkers = useTypedSelector<Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>>(state => state.location.markers.temp);
    const savedMarkers = useTypedSelector<Array<{latitude: number, longitude: number, details: {name: string, city: string, country: string}}>>(state => state.location.markers.saved);
    const selectedMarker = useTypedSelector<{latitude: number, longitude: number}>(state => state.restaurant.currentRestaurant);
    const dispatch = useTypedDispatch();


    const createSavedMarker = (lat: number, lng: number, name: string, city: string, country: string) => {
        dispatch({type: 'CREATE_SAVED_MARKER', payload: {latitude: lat, longitude: lng, details: {name, city, country}}});
        dispatch({type: 'CLEAR_TEMP_MARKERS'});
    }

    const selectMarker = (typeMarker: string, latitude: number, longitude: number) => {
        if(selectedMarker.latitude === latitude && selectedMarker.longitude === longitude)
            return icons['selectedMarker'];
        else
            return icons[`${typeMarker}Marker`];
    }

 
    return (
        <MapContainer className={styles.container} center={[latitude, longitude]} zoom={13}>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
                tempMarkers.map((marker) => {
                    const latitude = marker.latitude;
                    const longitude = marker.longitude;
                    const name = marker.details.name;
                    const city = marker.details.city;
                    const country = marker.details.country;

                    return (
                        <Marker 
                            position={[latitude, longitude]} 
                            eventHandlers={{
                                click: () => createSavedMarker(latitude, longitude, name, city, country),
                                mouseover: () => {}
                            }}
                            icon={new Icon({
                                iconUrl: selectMarker('temp', latitude, longitude),
                                iconSize: [38, 95],
                                iconAnchor: [22, 94],
                                popupAnchor: [-3, -76],
                                shadowSize: [68, 95],
                                shadowAnchor: [22, 94]
                            })}
                            >
                            <Tooltip direction={'top'} opacity={1} offset={[0, -60]}>
                                <div className={styles.popup}>
                                    <p>
                                        Name: {name}
                                    </p>
                                    <p>
                                        City: {city}
                                    </p>
                                    <p>
                                        Country: {country}
                                    </p>
                                </div>
                            </Tooltip>
                        </Marker>
                    )
                })
            }
           {
                savedMarkers.map((marker) => {
                    const latitude = marker.latitude;
                    const longitude = marker.longitude;
                    const name = marker.details.name;
                    const city = marker.details.city;
                    const country = marker.details.country;

                    return (
                        <Marker 
                            position={[latitude, longitude]}
                            icon={new Icon({
                                iconUrl: selectMarker('saved', latitude, longitude),
                                iconSize: [38, 95],
                                iconAnchor: [22, 94],
                                popupAnchor: [-3, -76],
                                shadowSize: [68, 95],
                                shadowAnchor: [22, 94]
                            })}
                            >
                            <Popup>
                                <div className={styles.popup}>
                                    <p>
                                        Name: {name}
                                    </p>
                                    <p>
                                        City: {city}
                                    </p>
                                    <p>
                                        Country: {country}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })
            }
        </MapContainer>
    )

}

export default memo(Map);