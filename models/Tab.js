const {Schema, model } = require('mongoose');

const tabSchema = new Schema({

    id_name: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    order: {type: Number, required: true},
    path: {type: String, required: true},
    content: [{type: String, ref: 'Content'}]
},{
    timestamps: true,
});

module.exports = model('Tab', tabSchema);