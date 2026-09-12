import React, {useState, useEffect} from 'react';

function useMediaQuery(query : string) {
    const [matches, setMatches] = useState<boolean>(false);

    const handleChange = (media: MediaQueryListEvent) : void => {
        setMatches(media.matches);
    }

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);
        media.addEventListener('change', handleChange);

        return () => {
            media.removeEventListener('change', handleChange);
        }
    }, [query])


    return [matches];
}

export default useMediaQuery;
