## Challenge Approach

This shows thought process of attempting the coding challenge.

2. Should only return Australian addresses

- filter through country code? - this can filtered by passing params to tomtom api
- Shape of tomtom api response

```json
{
  "summary": {
    "query": "123 main st",
    "queryType": "NON_NEAR",
    "queryTime": 351,
    "numResults": 10,
    "offset": 0,
    "totalResults": 100,
    "fuzzyLevel": 1,
    "queryIntent": []
  },
  "results": [
    {
      "type": "Point Address",
      "id": "TqWt9Hmwgl9mbYeCJU-cSQ",
      "score": 7.9132122993,
      "address": {
        "streetNumber": "123",
        "streetName": "Main Street",
        "municipality": "Norwalk",
        "neighbourhood": "Wilton Avenue",
        "countrySecondarySubdivision": "Western Connecticut",
        "countrySubdivision": "CT",
        "countrySubdivisionName": "Connecticut",
        "countrySubdivisionCode": "CT",
        "postalCode": "06851",
        "extendedPostalCode": "06851-4627",
        "countryCode": "US",
        "country": "United States",
        "countryCodeISO3": "USA",
        "freeformAddress": "123 Main Street, Norwalk, CT 06851",
        "localName": "Norwalk"
      },
      "position": { "lat": 41.123076, "lon": -73.416242 },
      "viewport": {
        "topLeftPoint": { "lat": 41.12398, "lon": -73.41744 },
        "btmRightPoint": { "lat": 41.12218, "lon": -73.41505 }
      },
      "entryPoints": [
        { "type": "main", "position": { "lat": 41.12307, "lon": -73.41565 } }
      ]
    },
    ...
  ]
}
```

3. Code should be maintainable and consistent

- typings
- docstrings
- linter
- easy to understand abstract classes / interfaces (in case we change the provider of a maps API)
- clearly defined functions that don't leave room for ambiguity

4. The result elements should contain important information about the place (country, municipality, etc)

- tomtom response output should return fields placeId, streerNumber, countryCode, country, freeformAddress and municipality to pass tests.

5. The returned result should be typed and easily consumable via users of the library

- The result of the function should return a common interface of the data structure
