const request = require('request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FraXQiLCJhIjoiY2p0MXBreGkxMGd3aDRhcDdkeDhsejd3NyJ9.tPiMY3TZjGmkgC5VVacBnw`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to fetch data from API.')
        } else if (!res.body.features.length) {
            callback('Not found location. Please try another search.')
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode