const mongoose = require('mongoose')
const {Query} = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.String,
    price: mongoose.Schema.Types.Number,
    count: mongoose.Schema.Types.Number
})

const ProductModel = mongoose.model('products', productSchema)

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

const deleteById = async (id) => {
    const deleted = await ProductModel.deleteOne({_id: id})
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

const updateById = async (id, newData = {
    name: undefined,
    price: undefined,
    count: undefined
}) => {

    console.log(id, newData)
    function filterUndefineds() {
        return Object.keys(newData)
            .filter(key => key !== undefined)
            .reduce((obj, key) => {
                obj[key] = newData[key];
                return obj;
            }, {});
    }

    newData = filterUndefineds(newData)

    return ProductModel.findOneAndUpdate(
        {_id: id}, newData
    );
}

const getSliceOfQuery = async (query, start, length) => {
    console.log(query instanceof Query)
    let res = query.skip(start).limit(length).exec()
    return res
}

const queryByFilter = ({
                                innerName = undefined,
                                minCount = undefined,
                                minPrice = undefined,
                                maxPrice = undefined
                            }, pag) => {
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

    let innerNameObj = {}
    if (innerName !== undefined) {
        innerNameObj.$in =  new RegExp(`^${innerName}`)
        filterObj.name = innerNameObj
    }

    const query = ProductModel.find(
        filterObj
    )
    return query
}

const ProductsAPI = {
    create,
    deleteByName,
    getSliceInRange,
    queryByFilter,
    getByName,
    updateByName,
    updateById,
    deleteById,
    getSliceOfQuery
}

module.exports = ProductsAPI