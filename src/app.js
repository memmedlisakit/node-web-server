const join = require('./utils/path_join')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// setup static directory to server
app.use(express.static(join('public')))

// setup express template engins
app.set('view engine', 'hbs')
app.set('views', join('templates/views'))
hbs.registerPartials(join('templates/partials'))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome Index',
        name: 'Sakit Memmedli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sakit Memmedli'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sakit Memedli',
        message: 'How can i help to you ?'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Sakit Memmedli',
        message: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) return res.send({ error: 'Address must provide!' })

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, summary, temperature) => {
            if (error) return res.send({ error })

            return res.send({
                summary,
                temperature,
                location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Sakit Memmedli',
        message: '404 Page not found'
    })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})