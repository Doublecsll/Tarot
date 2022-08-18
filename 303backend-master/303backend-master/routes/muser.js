const route = require('express').Router()
const { validate, ValidationError } = require('express-json-validator')
const muserSchema = require('../models/muser').muserSchema
const muser = require('../controllers/muser')

const Handler_Muser = new muser()

Handler_Muser.collectionConnect().then(() => {
    route.get('/login', (req, res) => { Handler_Muser.login(req, res) })
    route.post('/createMember', validate(muserSchema), (req, res) => { Handler_Muser.createUser(req, res) })
  //  route.post('/checkmember', validate(muserSchema), (req, res) => { Handler_Muser.(req, res) })
    route.delete('/deleteMember',  (req, res) => { Handler_Muser.deleteMember(req, res) })

    route.put('/updatePW', validate(muserSchema.properties), (req, res) => { Handler_Muser.updatePW(req, res)})
   
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

