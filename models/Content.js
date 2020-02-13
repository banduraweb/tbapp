const {Schema, model} = require('mongoose');

const contentSchema = new Schema({
        content: {type: String,  default: "Name"},
        tab_owner: {type: String, ref: 'Tab'}
    },
    {
        timestamps: true,
    });

module.exports = model('Content', contentSchema);