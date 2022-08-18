// Create a schema
exports.bookingSchema =
{
    type: 'object',
    required: ["usid", "date","color", "smcd","brand"],
    properties: {
        usid: { type: "string" },
        date: { type: "Date" },
        smcd: { type: "string" },
        brand: { type: "string" },
        color: { type: "string" },        
        socialFol:{ type: "string" },
        famFol1:{ type: "string" },
        famFol2:{ type: "string" },
        post:{ type: "string" }
    }
}