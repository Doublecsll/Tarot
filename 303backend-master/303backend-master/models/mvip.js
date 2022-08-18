exports.mvipSchema =
{
    type: 'object',
    required: ["usid", "uspw","age","name","phone","mtype"],
    properties: {
        usid:{ type: "string" },
        uspw:{ type: "string" },
        name:{ type: "string" },
        age:{ type: "number" },
        gender:{ type: "string" },
        phone:{ type: "string" },
        socialFol:{ type: "string" },
        famFol1:{ type: "string" },
        famFol2:{ type: "string" },
        oldpw:{ type: "string" },
        vcode:{ type: "string" },
        mtype:{ type: "string"}
    }
}