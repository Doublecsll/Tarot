const MongoClient = require("mongodb").MongoClient

const CONNECTION_URL = "mongodb+srv://sa:sqldba@cluster0.yiani.azure.mongodb.net/lvmh?retryWrites=true&w=majority"
const DATABASE_NAME = "fyp"

var database, collection
//var result=[]

module.exports = class Booking {
    collectionConnect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
                if (error) {
                    reject(new Error(error))
                }
                database = client.db(DATABASE_NAME)
                collection = database.collection("booking")

            })
            resolve(console.log("Connected to `" + DATABASE_NAME + "`!"))
        })
    }

    test(req, res) {
        res.send({ "status": 200, "Description": "Test only" })
    }

    bookingOne(request, response) {
        console.log(`Someone request all data`)
        collection.find({$and: [ {"smcd":request.query.smcd } ] }).toArray((err, docs) => {
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
   
    }

        getbooking(request, response) {
        console.log(`Someone request all data`)
        collection.find({$and: [ {"usid":request.query.usid } ] }).toArray((err, docs) => {
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
   
    }

    bookingBrand(request, response) {
        console.log(`Someone request all data`)
        collection.find({$and: [ {"brand":request.query.brand } ] }).toArray((err, docs) => {
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
   
    }




    bookingusid(request, response) {
        console.log(`Someone request all data`)
        collection.find({$and: [ {"usid":request.query.usid} ] }).toArray((err, docs) => {
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
   
    }



    createbooking(request, response) {
        console.log('Someone add booking')

        console.log("kbihbibuibuih"+request.body); 
        collection.insertOne(request.body, function (err) {
          
            console.log(request.body)
            if (err) {
            }
            response.status(201).send({ "status": 201, "description": "Data input successfully" })   // Created
        }) 
        console.log(collection);
    }

    deletebooking(request, response) {
        console.log('Someone de booking')

        collection.deleteMany({$and: [ { "usid": request.query.usid }, { "date": request.query.date },{"smcd":request.query.smcd} ] },  function (err, docs) {
                if (err) {
                    response.status(500).send({ "ststus": 500, "desc": err })
                }

                console.log(docs)
                response.send(docs)
            })
    }

    
    othercheckBooking(request, response) {
        console.log(`Someone make query ${request.query.usid}`)
       
        collection.find({ "post": "N",$or: [ { "socialFol":{$regex:request.query.socialFol} }, 
                                { "usid":{$regex:request.query.usid} }, 
                                 { "famFol1":{$regex:request.query.famFol1}},
                                 {"famFol2":{$regex:request.query.famFol1}} ] } 
                                 ).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }
    
    updateFeq(request, response) {
        console.log("update")
 
        collection.findOneAndUpdate({"usid":request.query.usid,"smcd":request.query.smcd,"date":request.query.date},{$set: {"post":request.query.post}},{returnNewDocument: true} ,function(err,docs){
            if(err) {
                response.status(500).send({"ststus":500,"desc":err})
            }
            
            console.log(docs)
            response.send(docs)})
    }
   


}
