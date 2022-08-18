// Create a schema
exports.mitypSchema =
{
    type: 'object',
    required: ['msku'],
    properties: {
        msku: { type: "string" }
    }
}