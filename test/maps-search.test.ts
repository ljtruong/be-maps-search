import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getAutoCompleteDetails } from '../src'
import { TomTomMaps } from '../src/maps/tomTom'

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    const mapsApi = new TomTomMaps()

    describe('getAutoCompleteDetails', () => {
        it ('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street', mapsApi)
            expect(res).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street', mapsApi)
            const firstRes = res[0];
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
            expect(firstRes.countryCode).toBe("AU")
        })
    })

    describe('getPlaceAutocomplete', () => {
        it('handles no results', async () => {
            const res = await mapsApi.getPlaceAutocomplete(process.env.TOMTOM_API_KEY as string, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })

        it('handles error', async () => {
            expect(mapsApi.getPlaceAutocomplete(process.env.TOMTOM_API_KEY as string, '')).rejects.toThrow()
        })
    })

})
