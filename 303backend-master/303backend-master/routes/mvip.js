const route = require('express').Router()
const { validate, ValidationError } = require('express-json-validator')
const mvipSchema = require('../models/mvip').mvipSchema
const mvip = require('../controllers/mvip')

const Handler_mvip = new mvip()

Handler_mvip.collectionConnect().then(() => {
    route.get('/login', (req, res) => { Handler_mvip.login(req, res) })
    route.post('/createMember', validate(mvipSchema), (req, res) => { Handler_mvip.createUser(req, res) })
    route.get('/checkmember', validate(mvipSchema), (req, res) => { Handler_mvip.checkmember(req, res) })
    route.get('/checkPhone', (req, res) => { Handler_mvip.checkPhone(req, res) })
    route.delete('/deleteMember',  (req, res) => { Handler_mvip.deleteMember(req, res) })
    route.get('/otherGet', (req, res) => { Handler_mvip.othercheckmember(req, res) })

    route.put('/updatePW', validate(mvipSchema.properties), (req, res) => { Handler_mvip.updatePW(req, res)})
   
    route.put('/updateMember', validate(mvipSchema.properties), (req, res) => { Handler_mvip.updateMember(req, res)})
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

