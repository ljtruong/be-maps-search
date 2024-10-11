import axios, { AxiosResponse } from 'axios'
import { MapsApiInterface, Address } from "./mapsProvider"

interface TomTomAddress {
    streetNumber: string | undefined,
    streetName: string,
    municipality: string,
    neighbourhood: string,
    countrySecondarySubdivision: string,
    countrySubdivision: string,
    countrySubdivisionName: string,
    countrySubdivisionCode: string,
    postalCode: string,
    extendedPostalCode: string,
    countryCode: string,
    country: string,
    countryCodeIS03: string,
    freeformAddress: string,
    localName: string,
}

interface Position {
    lat: number,
    lon: number,
}

interface ViewPort {
    btmRightPoint: Position,
    topLeftPoint: Position
}

interface entryPoints {
    type: string,
    position: Position
}

interface AddressResults {
    type: string,
    address: TomTomAddress,
    id: string,
    score: number,
    position: Position,
    viewport: ViewPort,
    entryPoints: entryPoints[]
}

interface QuerySummary {
    query: string,
    queryType: string,
    queryTime: number,
    numResults: number,
    offset: number,
    totalResults: number,
    fuzzyLevel: number,
    queryIntent: [],
}

interface TomTomResponse {
    summary: QuerySummary,
    results: AddressResults[]
}

/**
 * TomTomMaps that implements a common maps api interface
 * Considerations:
 *  - Can add expotential retry to api call due to intermittent failures of APIs
 *  - it's possible to move limit to use pagination instead if we want all results
 *  - we can move `AU` string to a parameter input to the function to make it more configurable for other countries.
 * https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
 */
export class TomTomMaps implements MapsApiInterface {
    async getPlaceAutocomplete(key: string, address: string): Promise<Address[]> {
        const autocomplete: AxiosResponse<TomTomResponse> = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
            params: {
                key,
                limit: 100,
                countrySet: 'AU',
            }
        });
        return autocomplete.data.results.map((result: AddressResults) => {
            return {
                placeId: result.id,
                streetNumber: result.address.streetNumber,
                countryCode: result.address.countryCode,
                country: result.address.country,
                freeformAddress: result.address.freeformAddress,
                municipality: result.address.municipality,
            }
        })
    }
}
