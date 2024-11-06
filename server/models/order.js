const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
     {
        productId: String,
        title: String,
        image: String,
        price: String,
        salePrice: String,
        quantity: Number,
     }
    ],
    addressInfo : {
        adressId: String,
        adress: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    }
} 
)

module.exports = mongoose.model('Order', OrderSchema)

