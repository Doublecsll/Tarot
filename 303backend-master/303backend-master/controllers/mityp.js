const MongoClient = require("mongodb").MongoClient

const CONNECTION_URL = "mongodb+srv://sa:sqldba@cluster0.yiani.azure.mongodb.net/lvmh?retryWrites=true&w=majority"
const DATABASE_NAME = "fyp"

var database, collection
//var result=[]

 

module.exports = class Muser {
    collectionConnect() { 
        return new Promise( (resolve, reject) => {
            MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
                if(error) {
                    reject(new Error(error))
                }
                database = client.db(DATABASE_NAME)
                collection = database.collection("mityp")
            
            }) 
            resolve(console.log("Connected to `" + DATABASE_NAME + "`!"))
        })
    }


    checkmsku(request, response) {
        console.log(`Someone make query ${request.query.usid}`)
        // title or description "keyword"
        // {$or: [{"title": {$regex: request.query.keyword}},
        //        {"description": {$regex: request.query.keyword}}]}
        collection.find({"usid": {$regex:request.query.usid}}).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }




    createmsku(request, response) {
        console.log('Someone add user')

        console.log(request.body)
        collection.insertOne(request.body, function(err) {

            console.log('Someone add user222222222222')
            console.log(request.body)
            if(err){
                response.status(500).send({"status": 500, "description" : err})
            } 
            response.status(201).send({"status": 201, "description": "Data input successfully"})   // Created
        })
        console.log(collection);
    }

  /*  updateMemo(request, response) {
        collection.findOneAndUpdate({isbn: request.body.isbn},
             {$set: request.body}, 
             {}, 
             (err) => {
                if(err) {
                    response.status(500).send({"status": 500, "description": err})
                }
                response.status(201).send({"status": 201, "description": "Data update successfully"})
            }
        )
    }*/ 

} 