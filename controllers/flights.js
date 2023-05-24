const Flight = require('../models/flight')

module.exports = {
    index,
    new: newFlight,
    create
}

async function index(req, res){
    const flights = await Flight.find();
    res.render('flights/index', {
        flights: flights,
        title: 'All Flights'
    })
}

function newFlight(req, res){
    res.render('flights/new', {
        errorMsg: '',
        title: 'Add New Flight'
    })
}

async function create(req, res){
    const airport = req.body.airport
    const airline = req.body.airline
    const flightNo = req.body.flightNo
    const departs = new Date(req.body.departs)
    console.log(departs.toISOString(), typeof(departs.toISOString()))
    console.log(typeof(departs), departs)
    if (flightNo > 9999 || flightNo < 10){
        res.render('flights/new', {title: 'Add New Flight', errorMsg: 'flight number must be between 10 and 9999'})
    } else{
        try{
            await Flight.create({airline,airport,flightNo,departs})

            res.redirect('/flights')
        } catch(err){
            console.log(err)
            res.render('flights/new', {
                title: 'Add New Flight',
                errorMsg: err
            })
        }
    }

}




const today = new Date()
const todayString = today.toLocaleDateString()+'T'+ today.toLocaleTimeString()
console.log('today: ', today.toISOString().slice(0,-8))