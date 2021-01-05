const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve                   
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', 
    {
        title: 'WEATHER App',
        name: 'Ashwini Kumar'
    })
})

app.get('/about', (req,res) => 
{
    res.render('about', 
    {
        title: 'About me',
        name: 'Ashwini Kumar'
    })

})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'HELP',
        name: 'Ashwini Kumar'
    })
})

//app.com
//app.com/help
//app.com/about

app.get('', (req,res) => 
{
    res.send('<h1>WEATHER</h1>')

})

// app.get('/help', (req, res) =>
// {
//     res.send({name:'Ashwini', age:20})
// })
//                                                        array can also be used to

// app.get('/help', (req, res) =>
// {
//     res.send([{name:'Ashwini'},{name:'Anant'}])
// })                                                      this will never too
     

// app.get('/about', (req, res) =>
// {
//     res.send('<h1>ABOUT</h1>')
// })                                  this will never run

app.get('/weather', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} ={}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastdata,
                location,
                address: req.query.address
            })
        })

    })
    // res.send({
    //     forecast: 'It is cold outside',
    //     location: 'Lucknow',
    //     address: req.query.address
    // })
})


app.get('/help/*', (req, res) =>
{
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Ashwini Kumar',
        errorMessage: 'Help article not found'
    })
})

app.get('/products',(req, res) => {
if(!req.query.search){
    return res.send({
        error: 'you must provide a search term'
    })
}

    console.log(req.query.search)
    res.send({
        products:[]
    })

})


app.get('*', (req, res) =>
{
   // res.send('my 404')
   res.render('404', {
       title: '404',
       name: 'Ashwini Kumar',
       errorMessage: 'Page not found'
   })
})

app.listen(port, () =>
{
    console.log('Server is up on port ' + port)

})