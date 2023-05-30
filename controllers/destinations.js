const Flight = require('../models/flight')

module.exports = {
    edit,
    update
}

async function edit(res, req, next){
    console.log(req.req.params.id)
    console.log(req.req.params.id)
    try{
        const flight = await Flight.findById(req.req.params.id)
       // console.log(req.req)
        res.res.render('flights/destinations/edit',
        {
            title: `edit destinations of flight No. ${flight.flightNo}`,
            errorMsg: '',
            flight
        })

    }catch(err){
        console.log(err)
    }
}

async function update(res, req, next){
    //console.log(req.req.body)
    if(!req.req.body.arrival0){
        console.log(req.req.body.destAirport, typeof(req.req.body.destAirport))
        if(typeof(req.req.body.destAirport) == "string"){
            console.log('changes to string')
            x = req.req.body.destAirport
            req.req.body.destAirport = []
            req.req.body.destAirport.push(x)
        }
        console.log(req.req.body.destAirport, typeof(req.req.body.destAirport))
        try {
            console.log('gets in the try')
            console.log(req.req.params.id)
            const flight = await Flight.findById(req.req.params.id)
            for(let i=0;i<req.req.body.destAirport.length; i++){
                console.log(req.req.body.destAirport[i])
                flight.destinations.push({airport: req.req.body.destAirport[i]})
            }
            await flight.save()
            res.res.render('flights/destinations/edit',{
                title: `edit destinations of flight No. ${flight.flightNo}`,
                errorMsg: '',
                flight
            })

        } catch (err) {
           console.log(err) 
           next()
        }
    } else {
        try {
            const flight = await Flight.findById(req.req.params.id)
            const arrivals = []
            console.log(req.req.body)
            for (key in req.req.body){
                arrivals.push(req.req.body[key])
            }
            for(let i=0;i<flight.destinations.length; i++){
                
                Object.assign(flight.destinations[i], {arrival: arrivals[i]})
            }
            await flight.save()
            res.res.redirect(`/flights/${req.req.params.id}`)
        } catch (err) {
            console.log(err)
            next()
        }
    }
}