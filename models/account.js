const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const accountModel = mongoose.model('account', accountSchema);

module.exports = accountModel;