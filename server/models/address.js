const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    userID: String,
    address: String,
    city: String, 
    pincode: String,
    phone: String, 
    notes: String
}, {timestamps : true}
)

module.exports = mongoose.model('Address', AddressSchema)