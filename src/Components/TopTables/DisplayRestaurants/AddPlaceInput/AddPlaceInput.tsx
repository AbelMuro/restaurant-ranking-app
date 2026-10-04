import React, {useState, ChangeEvent, useDeferredValue, useEffect, useRef} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import { ChangeTheme } from '~/Common/Functions';
import * as styles from './styles.module.css';

function AddPlaceInput() {
    const [place, setPlace] = useState<string>('');
    const deferredPlace = useDeferredValue<string>(place);
    const theme = useTypedSelector<string>(state => state.theme.theme);
    const open = useTypedSelector<boolean>(state => state.location.open);
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
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${deferredPlace}+California&format=jsonv2`, {
                method: 'GET'
            });

            if(response.status === 200){
                const result = await response.json();
                result.forEach((restaurant: any) => {
                    const lat = restaurant.lat;
                    const lon = restaurant.lon;
                    const details = {
                        name : restaurant.name,
                        address: restaurant.address
                    }

                    dispatch({type: 'CLEAR_TEMP_MARKERS'});
                    dispatch({type: 'CREATE_TEMP_MARKER', payload: {longitude: lon, latitude: lat, details}});
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
        <form className={styles.container} onBlur={handleBlur}>
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