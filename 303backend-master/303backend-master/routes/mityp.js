const route = require('express').Router()
const { validate, ValidationError } = require('express-json-validator')
const mitypSchema = require('../models/mityp').mitypSchema
const mityp = require('../controllers/mityp')

const Handler_mityp = new mityp()

Handler_mityp.collectionConnect().then(() => {
    route.get('/checkmsku', (req, res) => { Handler_mityp.checkmsku(req, res) })
    route.post('/createmsku', validate(mitypSchema), (req, res) => { Handler_mityp.createmsku(req, res) })
  
    route.use((err, req, res, next) => {
        if (err) {
            res.status(422).send({ "status": 422, "description": err.message })
        } else { next() }
    })
})
    .catch(
        err => console.error(`Error: ${err.message}`)
    )
module.exports = route

