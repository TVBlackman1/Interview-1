const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Number,
    count: mongoose.Schema.Types.Number
})

const ProductModel = mongoose.model('products', productSchema)

const test = async () => {
    const found = await ProductModel.findOne({name})
    console.log(found)
    return found

}

const create = async ({name, price, count}) => {
    const found = await getByName(name)
    console.log(name, found)
    if (found) {
        return new Error(`You can not create product with name "${name}". It already exists`)
    }

    const obj = {_id: new mongoose.Types.ObjectId(), name, price, count}
    return await ProductModel.create(obj)
}

const deleteByName = async (name) => {
    const deleted = await ProductModel.deleteOne({name})
    return deleted
}

const getByName = async (name) => {
    const found = await ProductModel.findOne({name})
    // console.log(found)
    return found
}

const getSliceInRange = async (start = 0, end = 0) => {
    const found = await ProductModel.find()
    return found
}

const updateByName = async (name, newData = {
    newName: undefined,
    newPrice: undefined,
    newCount: undefined
}) => {
    function filterUndefineds() {
        return Object.keys(newData)
            .filter(key => key !== undefined)
            .reduce((obj, key) => {
                obj[key] = raw[key];
                return obj;
            }, {});
    }

    newData = filterUndefineds(newData)

    ProductModel.findOneAndUpdate(
        {name}, newData
    )
}

const listByFilter = async ({
                                innerName = undefined,
                                minCount = undefined,
                                minPrice = undefined,
                                maxPrice = undefined
                            }) => {
    let filterObj = {}

    let priceObj = {}
    if (minPrice !== undefined) {
        priceObj.$gt = minPrice
    }
    if (maxPrice !== undefined) {
        priceObj.$lt = maxPrice
    }
    if(minPrice || maxPrice) {
        filterObj.price = priceObj
    }

    let countObj = {}
    if (minCount !== undefined) {
        countObj.$gt = minCount
        filterObj.count = countObj
    }

    const query = ProductModel.find(
        filterObj
    )
    const found = await query.exec()
    return found
}

const ProductsAPI = {
    test,
    create,
    deleteByName,
    getSliceInRange,
    listByFilter,
    getByName,
    updateByName
}

module.exports = ProductsAPI