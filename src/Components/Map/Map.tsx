import React, {memo, useState, useRef} from 'react';
import {useRestaurants} from '~/Common/Hooks';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import {Restaurant, Restaurants, Coordinates} from '~/Common/Types';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import ReCenterMap from './ReCenterMap';
import 'leaflet/dist/leaflet.css';
import icons from './icons';
import * as styles from './styles.module.css';
import { Icon } from 'leaflet';

const countryToNationality : Record<string, string> = {
  "United States": "American",
  "United Kingdom": "British",
  "Italy": "Italian",
  "France": "French",
  "Germany": "German",
  "Spain": "Spanish",
  "Portugal": "Portuguese",
  "Netherlands": "Dutch",
  "Switzerland": "Swiss",
  "Austria": "Austrian",
  "Belgium": "Belgian",
  "Ireland": "Irish",
  "Norway": "Norwegian",
  "Sweden": "Swedish",
  "Finland": "Finnish",
  "Denmark": "Danish",
  "Poland": "Polish",
  "Czechia": "Czech",
  "Greece": "Greek",
  "Turkey": "Turkish",
  "Russia": "Russian",
  "Ukraine": "Ukrainian",
  "China": "Chinese",
  "Japan": "Japanese",
  "South Korea": "South Korean",
  "North Korea": "North Korean",
  "India": "Indian",
  "Pakistan": "Pakistani",
  "Bangladesh": "Bangladeshi",
  "Sri Lanka": "Sri Lankan",
  "Thailand": "Thai",
  "Vietnam": "Vietnamese",
  "Philippines": "Filipino",
  "Indonesia": "Indonesian",
  "Malaysia": "Malaysian",
  "Singapore": "Singaporean",
  "Australia": "Australian",
  "New Zealand": "New Zealander",
  "Canada": "Canadian",
  "Mexico": "Mexican",
  "Brazil": "Brazilian",
  "Argentina": "Argentine",
  "Chile": "Chilean",
  "Colombia": "Colombian",
  "Peru": "Peruvian",
  "Venezuela": "Venezuelan",
  "South Africa": "South African",
  "Saudi Arabia": "Saudi",
  "United Arab Emirates": "Emirati",
  "Israel": "Israeli",
  "Egypt": "Egyptian",
  "Morocco": "Moroccan",
  "Nigeria": "Nigerian",
  "Kenya": "Kenyan",
};

function Map() {
    const [open, setOpen] = useState<boolean>(false);
    const selectedRestaurant = useRef<Restaurant>(null);
    const latitude = useTypedSelector<number>(state => state.map.center.latitude);
    const longitude = useTypedSelector<number>(state => state.map.center.longitude);
    const tempMarkers = useTypedSelector<Restaurants>(state => state.map.markers.temp);
    const savedMarkers = useTypedSelector<Restaurants>(state => state.map.markers.saved);
    const selectedMarker = useTypedSelector<Coordinates>(state => state.restaurant.selectedRestaurant);
    const dispatch = useTypedDispatch();
    const [displayMarkers] = useRestaurants(savedMarkers);    

    const createSavedMarker = (restaurant: Restaurant) => {
        const latitude = restaurant.latitude;
        const longitude = restaurant.longitude;
        const name = restaurant.name;
        const city = restaurant.city;
        const country = restaurant.country;
        const category = restaurant.category;
        dispatch({type: 'CREATE_SAVED_MARKER', payload: {latitude, longitude, name, city, country, category}});
        dispatch({type: 'UPDATE_ALL_RESTAURANTS', payload: {latitude, longitude, name, city, country, category}});
        dispatch({type: 'CLEAR_TEMP_MARKERS'});
    }

    const selectMarker = (typeMarker: string, latitude: number, longitude: number) => {
        if(selectedMarker.latitude === latitude && selectedMarker.longitude === longitude)
            return icons['selectedMarker'];
        else
            return icons[`${typeMarker}Marker`];
    }

    const handleOpen = (restaurant: Restaurant) => {
        const latitude = restaurant.latitude;
        const longitude = restaurant.longitude;
        const name = restaurant.name;
        const city = restaurant.city;
        const country = restaurant.country;
        const category = restaurant.category;
        selectedRestaurant.current = {latitude, longitude, name, city, country, category}
        setOpen(!open);
    };

 
    return (
        <>
            {open && <div className={styles.overlay}>
                <dialog className={styles.dialog} open={true}>
                    <h2 className={styles.dialog_title}>

                    </h2>
                </dialog>
            </div>}
            <MapContainer className={styles.container} center={[latitude, longitude]} zoom={13}>
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {
                    tempMarkers.map((marker) => {
                        const latitude = marker.latitude;
                        const longitude = marker.longitude;
                        const name = marker.name;
                        const city = marker.city;
                        const country = marker.country;
                        const countrySynonym = countryToNationality[country];
                        return (
                            <Marker 
                                position={[latitude, longitude]} 
                                eventHandlers={{
                                    click: () => handleOpen({latitude, longitude, name, city, country, category: countrySynonym}),
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
                    displayMarkers.map((marker) => {
                        const latitude = marker.latitude;
                        const longitude = marker.longitude;
                        const name = marker.name;
                        const city = marker.city;
                        const country = marker.country;

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
                <ReCenterMap latitude={latitude} longitude={longitude}/>
            </MapContainer>        
        </>

    )

}

export default memo(Map);