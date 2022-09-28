const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicnludGF0dWFuIiwiYSI6ImNsN3Nqb2doNTBiY20zcG53cnRneG4xeWwifQ.npKWDy3vs-xLZLYs1D2cGA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to mapbox service', undefined);
        } else if (!body.features) {
            callback('Bad request', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to get longitude and latitude', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode