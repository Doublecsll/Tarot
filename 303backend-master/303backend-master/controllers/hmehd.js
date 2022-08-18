const MongoClient = require("mongodb").MongoClient

const CONNECTION_URL = "mongodb+srv://sa:sqldba@cluster0.yiani.azure.mongodb.net/lvmh?retryWrites=true&w=majority"
const DATABASE_NAME = "fyp"

var database, collection
//var result=[]

module.exports = class Hmehd {
    collectionConnect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
                if (error) {
                    reject(new Error(error))
                }
                database = client.db(DATABASE_NAME)
                collection = database.collection("hmehd")

            })
            resolve(console.log("Connected to `" + DATABASE_NAME + "`!"))
        })
    }

    test(req, res) {
        res.send({ "status": 200, "Description": "Test only" })
    }

    memoOne(request, response) {

        // console.log(`Someone make query ${request.query.memo}`)
 
      
        console.log(`Someone request all books`)
        collection.find({$and: [ { "usid": request.query.usid },{ "smcd": request.query.smcd } ] }).toArray((err, docs) => {
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
        // title or description "keyword"
        // {$or: [{"title": {$regex: request.query.keyword}},
        //        {"description": {$regex: request.query.keyword}}]}
        /*collection.find({"memo": {$regex: request.query.memo}}).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
            console.log(docs)
            response.send(docs)
             
        })*/
    }


    Checkmedica(request, response) {

        // console.log(`Someone make query ${request.query.memo}`)
 
      
        console.log(`Someone request all books`)
        collection.find({$and: [ { "usid": request.query.usid } ] }).toArray((err, docs) => {
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
      
    }


    createMemo(request, response) {
        console.log('Someone add memo')

        console.log(request.body)
        collection.insertOne(request.body, function (err) {
            console.log(request.body)
            if (err) {
                response.status(500).send({ "status": 500, "description": err })
            }
            response.status(201).send({ "status": 201, "description": "Data input successfully" })   // Created
        })
        console.log(collection);
    }

   deleteMemo(request, response) {
        console.log('Someone de memo')

        collection.deleteMany({$and: [ { "usid": request.query.usid }, { "memo": request.query.memo } ] },  function (err, docs) {
                if (err) {
                    response.status(500).send({ "ststus": 500, "desc": err })
                }

                console.log(docs)
                response.send(docs)
            })
    }

    
    othercheck(request, response) {
        console.log(`Someone make query ${request.query.usid}`)
       
        collection.find({ "post": "N",$or: [ { "socialFol":{$regex:request.query.socialFol} }, 
        { "famFol1":{$regex:request.query.famFol1}},
        {"famFol2":{$regex:request.query.famFol1}},{ "usid":{$regex:request.query.usid} } ] } 
                                 ).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }
   
    othercheckY(request, response) {
        console.log(`Someone make query ${request.query.usid}`)
       
        collection.find({$or: [ { "socialFol":{$regex:request.query.socialFol} }, 
        { "famFol1":{$regex:request.query.famFol1}},
        {"famFol2":{$regex:request.query.famFol1}},{ "usid":{$regex:request.query.usid} } ] } 
                                 ).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }






    updateFeq(request, response) {
        console.log("update")
 
        collection.findOneAndUpdate({"usid":request.query.usid,"smcd":request.query.smcd,"msku":request.query.msku},{$set: {"post":request.query.post}},{returnNewDocument: true} ,function(err,docs){
            if(err) {
                response.status(500).send({"ststus":500,"desc":err})
            }
            
            console.log(docs)
            response.send(docs)})
    }
   

}
