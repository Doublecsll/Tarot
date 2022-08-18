// Create a schema
exports.hmedtSchema =
{
    type: 'object',
    required: ["memo","usid","usnm","msku","mqty","txdt"],
    properties: {
        memo:{ type: "number"},
        usid:{ type: "String" },
        usnm:{ type: "String" },
        msku:{ type: "String" },
        mqty:{ type: "number"},
        time:{ type: "String" },
        feq:{type : "number"},
        remk:{ type: "String" },
        mrod:{ type: "String" },        
        socialFol:{ type: "string" },
        famFol1:{ type: "string" },
        famFol2:{ type: "string" },
        day:{type:"number"}
        
    }
}