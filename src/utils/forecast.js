const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=313b9cb21d714ff4727a45a35808377b&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temp = body.current.temperature
            const feelTemp = body.current.feelslike
            const humidity = body.current.humidity
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${temp} degress out. It feels like ${feelTemp} degress out. The humidity is ${humidity}`);
        }
    })
}

module.exports = forecast