const {Schema, model} = require('mongoose');

const signupSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: String,
    pwd: String,
    createdOn: {
     type: Date,
     default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    },
    deletedOn: Date,
    isVerified: {
        type: Boolean,
        default: false
    }
});

signupModel = model('signup',signupSchema);
module.exports = signupModel; 