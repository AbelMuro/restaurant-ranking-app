export type Restaurant = {
    latitude: number, 
    longitude: number, 
    name: string, 
    city: string, 
    country: string, 
    category: string,
    rank: number,
    try: boolean
};

export type Restaurants = Array<Restaurant>;

export type Coordinates = {latitude: number, longitude: number}