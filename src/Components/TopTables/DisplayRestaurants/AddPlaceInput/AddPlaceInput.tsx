import React, {useState, ChangeEvent, useDeferredValue, useEffect, useRef} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import { ChangeTheme } from '~/Common/Functions';
import * as styles from './styles.module.css';

function AddPlaceInput() {
    const [place, setPlace] = useState<string>('');
    const deferredPlace = useDeferredValue<string>(place, '');
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const open = useTypedSelector<boolean>(state => state.location.open);
    const userLocation = useTypedSelector<{latitude: number, longitude: number}>(state => state.location.user);
    const dispatch = useTypedDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        dispatch({type: 'DISPLAY_INPUT'});
    }
    
    const handleChange = (e : ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        setPlace(value);
    }

    useEffect(() => {
        if(!deferredPlace) return

        const fetchRequest = async () => {
            const response = await fetch(`https://api.geoapify.com/v2/places?categories=catering.fast_food&filter=circle:${userLocation.longitude},${userLocation.latitude},10000&name=${deferredPlace}&apiKey=${process.env.apiKey}`, {
                method: 'GET'
            });
        

            if(response.status === 200){
                const result = await response.json();
                result.features.forEach((feature : any) => {
                    const properties = feature.properties;
                    const name = properties.brand;
                    const city = properties.city;
                    const country = properties.country;
                    const lat = properties.lat;
                    const lon = properties.lon;

                    dispatch({type: 'CLEAR_TEMP_MARKERS'});
                    dispatch({type: 'CREATE_TEMP_MARKER', payload: {longitude: lon, latitude: lat, details: {name, city, country}}});                       
                })   
            }
            else{
                const result = await response.text();
                console.log(result);
            }

        };

        fetchRequest();
    }, [deferredPlace])

    useEffect(() => {
        return () => {
            dispatch({type: 'CLEAR_TEMP_MARKERS'});
        }
    }, [])


    useEffect(() => {
        if(!open) return;

        if(inputRef.current)
            inputRef.current.focus();
    }, [open])

    return open && (
        <form className={styles.container}>
            <label className={ChangeTheme(styles, 'title', theme)}>
                Enter Restaurant:
            </label>
            <input 
                type='text' 
                value={place} 
                onChange={handleChange} 
                className={ChangeTheme(styles, 'input', theme)}
                ref={inputRef}
                />            
        </form>
    );
}

export default AddPlaceInput;