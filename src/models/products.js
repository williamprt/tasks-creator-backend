const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: false,
    },
    info: {
        type: String,
        required: false,
        unique: false,
    },
}, {
    timestamps: true,
})
let Schema = mongoose.model('/tasks', ProductSchema);

module.exports = Schema;