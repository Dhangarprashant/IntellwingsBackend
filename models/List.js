const mongoose = require('mongoose');
const Schema = mongoose.Schema

const listSchema = new Schema({
    id: {type: Number},
    firstName: { type: String},
    lastName: { type: String},
    countryCode: {type: Number},
    phoneNumber: {type: Number},
    dateOfCreation:{type: Date, default: new Date()}
});

 const Users= mongoose.model('List', listSchema);
 module.exports = Users;

