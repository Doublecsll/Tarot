const route = require('express').Router()
const {validate, ValidationError} = require('express-json-validator')
const hmehdSchema = require('../models/hmehd').hmehdSchema
const hmehd = require('../controllers/hmehd')

const handler_hmehd = new hmehd()

handler_hmehd.collectionConnect().then( () => {
    
    route.get('/otherGet', (req, res) => { handler_hmehd.othercheck(req, res) })
    route.get('/otherGetY', (req, res) => { handler_hmehd.othercheckY(req, res) })
    route.get('/getmemo',validate(hmehdSchema.properties),  (req, res) => { handler_hmehd.memoOne (req,res)})
    route.get('/getMedica',validate(hmehdSchema.properties),  (req, res) => { handler_hmehd.Checkmedica (req,res)})
    route.post('/createMemo', validate(hmehdSchema.properties), (req, res) => { handler_hmehd.createMemo(req, res)})
    route.delete('/deleteMemo', validate(hmehdSchema.properties), (req, res) => { handler_hmehd.deleteMemo(req, res)})
 
    route.put('/updateFeq', validate(hmehdSchema.properties), (req, res) => { handler_hmehd.updateFeq(req, res)})
    route.use((err, req, res, next)=>{
        if(err) {
            res.status(422).send({"status": 422, "description": err.message})            
        } else { next() }
    })
    
})
.catch(
    err=> console.error(`hmehd: Error: ${err.message}`)
)

module.exports = route