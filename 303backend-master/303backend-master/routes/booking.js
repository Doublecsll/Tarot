const route = require('express').Router()
const {validate, ValidationError} = require('express-json-validator')
const bookingSchema = require('../models/booking').bookingSchema
const Booking = require('../controllers/booking')

const booking = new Booking()

booking.collectionConnect().then( () => {

    route.get('/otherGet', (req, res) => { booking.othercheckBooking(req, res) })

    route.put('/updatepost', (req, res) => { booking.updateFeq(req, res) })
    
    route.get('/getbooking',validate(bookingSchema.properties),  (req, res) => { booking.bookingOne (req,res)})

    route.get('/getbookingM',validate(bookingSchema.properties),  (req, res) => { booking.getbooking (req,res)})
    route.get('/getbookingBrand',validate(bookingSchema.properties),  (req, res) => { booking.bookingBrand (req,res)})
    route.get('/bookingusid',validate(bookingSchema.properties),  (req, res) => { booking.bookingusid (req,res)})
  
    route.delete('/deletebooking', validate(bookingSchema.properties), (req, res) => { booking.deletebooking(req, res)})
 
    route.post('/createbooking', validate(bookingSchema.properties), (req, res) => { booking.createbooking(req, res)})

    route.use((err, req, res, next)=>{
        if(err) {
            res.status(422).send({"status": 422, "description": err.message})            
        } else {    
            next() }
    })
    
})
.catch(
    err=> console.error(`Booking: Error: ${err.message}`)
)

module.exports = route