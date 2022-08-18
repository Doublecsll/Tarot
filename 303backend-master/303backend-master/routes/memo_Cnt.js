const route = require('express').Router()
const { validate, ValidationError } = require('express-json-validator')
const memo_CntSchema = require('../models/memo_count').memo_CntSchema
const memo_Cnt = require('../controllers/memo_Cnt')

const Handler_memo_Cnt = new memo_Cnt()

Handler_memo_Cnt.collectionConnect().then(() => {
 
    route.get('/getmemonumber', (req, res) => { Handler_memo_Cnt.checkmemoNumber(req, res) })
    
    route.put('/updateMemoNum', validate(memo_CntSchema.properties), (req, res) => { Handler_memo_Cnt.updateMemoNum(req, res)})
   
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

