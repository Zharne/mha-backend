const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    catergory: {
        type:String,
        required:true,
    },
    created_by: {
        type:String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array,
        required: false,
        default: []
    }
}, { timestamps: true });


module.exports = mongoose.model('Posts', PostSchema);
