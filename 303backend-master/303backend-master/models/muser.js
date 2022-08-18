// Create a schema
exports.muserSchema =
{
    type: 'object',
    required: ['usid', 'uspw','DN','brand'],
    properties: {
        usid: { type: "string" },
        uspw: { type: "string" },
        DN: { type: "string" },
        brand:{ type: "string" },
        oldpw:{ type: "string" }
    }
}