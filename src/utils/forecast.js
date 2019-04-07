const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/d628711e370b9f2b06b34ab2a3161226/${latitude},${longitude}`;

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to fetch data from API.')
        } else if (res.body.error) {
            callback('Not found forecast. Please try another search.')
        } else {
            callback(undefined, res.body.daily.summary, res.body.currently.temperature)
        }
    })
}


module.exports = forecast;