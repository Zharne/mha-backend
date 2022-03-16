const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
created_by: {
    type: String,
    required: false,
},
comment: {
    type: String,
    required: true,
},
});

module.exports = mongoose.model("comment", commentSchema);
