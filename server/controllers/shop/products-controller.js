
const Product = require('../../models/product')
const {tryCatchSimple} = require('../../utilities/errorhandling')

const getFilteredProducts = async(req, res)=>{
    const products = await Product.find({})
    res.status(200).json({
        success: true,
        data: products
    })
}

module.exports = { getFilteredProducts: tryCatchSimple(getFilteredProducts)}
