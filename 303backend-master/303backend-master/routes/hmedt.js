const route = require('express').Router()
const {validate, ValidationError} = require('express-json-validator')
const hmedtSchema = require('../models/hmedt').hmedtSchema
const hmedt = require('../controllers/hmedt')

const handler_Hmedt = new hmedt()

handler_Hmedt.collectionConnect().then( () => {


    route.get('/otherGet', (req, res) => { handler_Hmedt.othercheck(req, res) })
    
    route.get('/getmemo',validate(hmedtSchema.properties),  (req, res) => { handler_Hmedt.memoOne (req,res)})
 
    route.put('/updateMemo', validate(hmedtSchema.properties), (req, res) => { handler_Hmedt.updateMemo(req, res)})
    route.delete('/deleteMemo', validate(hmedtSchema.properties), (req, res) => { handler_Hmedt.deleteMemo(req, res)})
 
    route.post('/createMemo', validate(hmedtSchema.properties), (req, res) => { handler_Hmedt.createMemo(req, res)})
    route.post('/checkMax',  (req, res) => { handler_Hmedt.checkMax(req, res)})
 
    route.put('/updateFeq', validate(hmedtSchema.properties), (req, res) => { handler_Hmedt.updateFeq(req, res)})

    route.use((err, req, res, next)=>{
        if(err) {
            res.status(422).send({"status": 422, "description": err.message})            
        } else {    
            next() }
    })
    
})
.catch(
    err=> console.error(`hmedt: Error: ${err.message}`)
)

module.exports = route