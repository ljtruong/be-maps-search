export interface Address {
    placeId: string,
    streetNumber: string | undefined,
    countryCode: string,
    country: string,
    freeformAddress: string,
    municipality: string,
}

/**
* Common interface for maps api providers
*/
export interface MapsApiInterface {
    /**
     * Common method to auto search a place
     * @param key API key
     * @param address address for search input
     */
    getPlaceAutocomplete(key: string, address: string): Promise<Address[]>;
}
