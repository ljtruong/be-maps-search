import { MapsApiInterface } from './maps/mapsProvider';
import { Address } from './maps/mapsProvider'

/**
 * Filter api response for au region
 * Note: Even though tomtom api provides a filter, it's better to build defensively.
 * @param apiResponse maps api response
 * @returns filtered api response for country codes
 */
function filterAuRegion(apiResponse: Promise<Address[]>): Promise<Address[]>{
    return apiResponse.then(async(result) => {
        return result.filter(address => address.countryCode == "AU")
    })
}

/**
 * Autocomplete an address search
 * @param address the prompt for an address
 * @param mapsApi the maps api provider for searching a place
 * @returns addresses matching search
 */
export async function getAutoCompleteDetails(address: string, mapsApi: MapsApiInterface): Promise<Address[]> {
    const apiKey = process.env.TOMTOM_API_KEY as string;
    // get autocomplete results
    const res = mapsApi.getPlaceAutocomplete(apiKey, address).then(async (autocompleteResults) => {
        return autocompleteResults
    })
    // loop over and get details and map results
    return filterAuRegion(res)
}
