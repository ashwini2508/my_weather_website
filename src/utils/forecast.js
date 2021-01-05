const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=0b3e428968ea8e88b88e2c40153c4d7e&query='+ latitude + ',' + longitude + '&units=m'

    request
    (
        {url,
        json: true},
        (error, {body}) =>
    {
        if (error)
        {
            callback('Unable to connect to weather services!', undefined)
        }
        else if (body.error)
        {
            callback('Unable to find location!', undefined)
        }
        else
        {
            callback(undefined,  body.current.weather_descriptions[0] + ' conditions. It is currently ' + body.current.temperature + ' degrees celcius, Feels like ' + body.current.feelslike + ' degrees celcius and there is ' + body.current.precip + ' % chances of rain')
        }
    })

}

module.exports = forecast