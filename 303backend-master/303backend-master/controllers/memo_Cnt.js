const MongoClient = require("mongodb").MongoClient

const CONNECTION_URL = "mongodb+srv://sa:sqldba@cluster0.yiani.azure.mongodb.net/lvmh?retryWrites=true&w=majority"
const DATABASE_NAME = "fyp"

var database, collection
//var result=[]

 

module.exports = class memo_Cnt {
    collectionConnect() { 
        return new Promise( (resolve, reject) => {
            MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
                if(error) {
                    reject(new Error(error))
                }
                database = client.db(DATABASE_NAME)
                collection = database.collection("memo_count")
            
            }) 
            resolve(console.log("Connected to `" + DATABASE_NAME + "`!"))
        })
    }


    checkmemoNumber(request, response) {
      
        collection.find().toArray((err, docs) => {
            console.log("dfg")
            if (err) {
                res.status(500).send({ "status": 500, "description": err })
            }
            console.log(docs)
            response.send(docs)
        })
    }

    updateMemoNum(request, response) {
        console.log("update")
        var newvalues = { $set: {"memo_cnt":request.query.memo_cnt} };
        collection.update({},newvalues,function(err,docs){
            if(err) {
                response.status(500).send({"ststus":500,"desc":err})
            }
            
            console.log(docs)
            response.send(docs)})
    }
   

} 