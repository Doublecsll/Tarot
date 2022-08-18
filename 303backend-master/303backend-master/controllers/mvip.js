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
                collection = database.collection("mvip")
            
            }) 
            resolve(console.log("Connected to `" + DATABASE_NAME + "`!"))
        })
    }


    checkmember(request, response) {
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
    checkPhone(request, response) {
        console.log(`Someone make query ${request.query.phone}`)
      
        collection.find({"phone": request.query.phone}).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }

    login(request, response) {
        console.log(`Someone make query ${request.query.usid}`)
        // title or description "keyword"
        // {$or: [{"title": {$regex: request.query.keyword}},
        //        {"description": {$regex: request.query.keyword}}]}
        collection.find({"usid": request.query.usid}/*,{"uspw": request.query.uspw}*/).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }



    createUser(request, response) {
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

 
    updateMember(request, response) {
        console.log("update")
 
        collection.findOneAndUpdate({"usid":request.query.usid},{$set: 
            {       
            "uspw":request.query.uspw,     
            "name":request.query.name,
            "age":request.query.age,
            "gender":request.query.gender,
            "phone":request.query.phone,
            "socialFol":request.query.socialFol,
            "famFol1":request.query.famFol1,
            "famFol2":request.query.famFol2,            
            "vcode":request.query.vcode}
        
        },{returnNewDocument: true} ,function(err,docs){
            if(err) {
                response.status(500).send({"ststus":500,"desc":err})
            }
            
            console.log(docs)
            response.send(docs)})
    }

    deleteMember(request, response) {
        console.log('Someone de memo')
         
        collection.deleteOne(  {"usid":request.query.usid},{"uspw":request.query.uspw} ,function(err,docs){
            if(err) {
                response.status(500).send({"ststus":500,"desc":err})
            }
            
            console.log(docs)
            response.send(docs)})
    }

    updatePW(request, response) {
        console.log("update")
 
        collection.findOneAndUpdate({"usid":request.query.usid},{$set: {"usid":request.query.usid,"uspw":request.query.uspw,"oldpw":request.query.oldpw}},{returnNewDocument: true} ,function(err,docs){
            if(err) {
                response.status(500).send({"ststus":500,"desc":err})
            }
            
            console.log(docs)
            response.send(docs)})
    }


    othercheckmember(request, response) {
        console.log(`Someone make query ${request.query.usid}`)
        // title or description "keyword"
        // {$or: [{"title": {$regex: request.query.keyword}},
        //        {"description": {$regex: request.query.keyword}}]}
        collection.find({ $or: [ { "socialFol":{$regex:request.query.socialFol} }, 
                                 { "famFol1":{$regex:request.query.famFol1}},
                                 {"famFol2":{$regex:request.query.famFol1}} ] } 
                                 ).toArray((err, docs) =>{
            if(err) {
                response.status(500).send({"status":500, "description":err})
            } 
    
            response.send(docs)
        })
    }
   

} 