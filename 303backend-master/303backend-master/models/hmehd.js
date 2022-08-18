// Create a schema
exports.hmehdSchema =
{
    type: 'object',
    required: ["memo","stid","usid","usnm","smcd","msku","mqty","txdt"],
    properties: {
        memo:{ type: "number"},
        stid:{ type: "number"},
        usid:{ type: "String" },
        usnm:{ type: "String" },
        smcd:{ type: "String" },
        msku:{ type: "String" },
        mqty:{ type: "number"},
        time:{ type: "String" },
        feq:{type : "number"},
        remk:{ type: "String" },
        mrod:{ type: "String" },        
        socialFol:{ type: "string" },
        famFol1:{ type: "string" },
        famFol2:{ type: "string" },
        Mremk:{ type: "string" },
        day:{type:"number"},
        post:{type:"string"}
        
    }
}