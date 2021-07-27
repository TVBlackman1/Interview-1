const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Number,
    count: mongoose.Schema.Types.Number
})

const productModel = mongoose.model('products', productSchema)

const test = async () => {
    const found = await productModel.findOne({name})
    console.log(found)
    return found

}

const create = async ({name, price, count}) => {
    const found = await productModel.findOne({name})
    console.log(found)
}

const getSliceInRange = async (start = 0, end = 0) => {
    const found = await productModel.findOne({name: "test"})
    return found
}

const ProductsAPI = {
    test,
    create,
    getSliceInRange
}

module.exports = ProductsAPI