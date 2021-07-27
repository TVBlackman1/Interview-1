const dbProductsAPI = require('../models/Products')

const elementsCountOnPage = 30
const defaultPageNumber = 1

const getList = async (options) => {
    const pagination = options.pagination || defaultPageNumber
    const elementsCount = options.count || elementsCountOnPage

    const startIndex = elementsCount * (pagination - 1)
    const endIndex = startIndex + elementsCount

    const dbRes = await dbProductsAPI.getSliceInRange(startIndex, endIndex)
    console.log(dbRes)
    return dbRes
}

const ProductsAPI = {
    getList
}

module.exports = ProductsAPI