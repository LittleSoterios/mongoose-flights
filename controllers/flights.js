const Flight = require('../models/flight')

module.exports = {
    index,
    new: newFlight,
    create,
    edit,
    update,
    show
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
    //console.log(departs.toISOString(), typeof(departs.toISOString()))
    //console.log(typeof(departs), departs)
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

async function edit(req, res, next){
    
    try{
        const flight = await Flight.findById(req.params.id)
        //console.log(req.params.id)
        //console.log(flight)
        //flight = flight.toObject()
        //console.log(typeof flight)
        
       // console.log('flight ID: ', flight._id)
        res.render('flights/edit', {
            title: `Edit flight no. ${req.flightNo}`,
            flight,
            errorMsg: ''
    })  
    } catch(err){
        console.log('Error: ', err)
        next()
    }
    
}

async function update(req, res, next){
    console.log('flightNo = ', req.body.flightNo)
    if (req.body.flightNo > 9999 || req.body.flightNo < 10){
        res.redirect(`/flights/${req.params.id}/edit`)
    } else{
      try{
        let flight = await Flight.findById(req.params.id)
        //flight = flight.toObject()
        Object.assign(flight, req.body)
        flight.save()
        res.redirect('/')
    } catch(err){
        console.log(err)
        next()
    }  
    }
    
    
}
async function show(req, res, next){
    try{
        const flight = await Flight.findById(req.params.id)
        res.render(`flights/show`, {
            flight,
            errorMsg: '',
            title: `Flight no. ${flight.flightNo}`
    })
    } catch(err){
        console.log(err)
        next()
    }
    
}




