const DbProductsAPI = require('../models/Products')

const elementsCountOnPage = 6
const defaultPageNumber = 1


/**
 * not required:
 * @param options = {
 *     pagination: 1, - number of page
 *     count: 30,     - elements on page
 * }
 * @returns {Promise<*>}
 */
const getList = async (options = {}) => {
    const pagination = options.pagination || defaultPageNumber
    const elementsCount = options.count || elementsCountOnPage

    const startIndex = elementsCount * (pagination - 1)
    const endIndex = startIndex + elementsCount

    const dbRes = await DbProductsAPI.getSliceInRange(startIndex, endIndex)
    // console.log(dbRes)
    return dbRes
}

const getByName = async (name = "") => {
    if (name === "") {
        return undefined
    }

    const dbRes = await DbProductsAPI.getByName(name)
    return dbRes
}

const removeByName = async (name) => {
    await DbProductsAPI.deleteByName(name)
}

const create = async ({name, price, count}) => {
    if (price === undefined || price < 0)
        price = 0
    if (count === undefined || count < 0)
        count = 0
    return await DbProductsAPI.create(
        {name, price, count}
    )
}

const editByName = async (name, {newName, newPrice, newCount}) => {
    await DbProductsAPI.updateByName(name, {newName, newPrice, newCount})
}

const editById = async (id, {newName, newPrice, newCount}) => {
    await DbProductsAPI.updateById(id, {name: newName, price: newPrice, count: newCount})
}

const changePriceByName = async (name, newPrice) => {
    return await DbProductsAPI.updateByName(name, {undefined, newPrice, undefined})
}

const changeCountByName = async (name, newCount) => {
    return await DbProductsAPI.updateByName(name, {undefined, undefined, newCount})
}

const deleteByName = async (name) => {
    return await DbProductsAPI.deleteByName(name)
}

const deleteById = async (id) => {
    return await DbProductsAPI.deleteById(id)
}


const listByFilter = async ({innerName, minCount, minPrice, maxPrice}, options = {pagination:1, count: 6}) => {
    const pagination = options.pagination || defaultPageNumber
    const elementsCount = options.count || elementsCountOnPage

    const startIndex = elementsCount * (pagination - 1)

    let query = DbProductsAPI.listByFilter({innerName, minCount, minPrice, maxPrice})
    console.log(innerName)
    return await DbProductsAPI.getSliceOfQuery(query, startIndex, elementsCount)
}

const ProductsAPI = {
    create,
    removeByName,
    editByName,
    changeCountByName,
    changePriceByName,
    getList,
    getByName,
    deleteByName,
    listByFilter,
    editById,
    deleteById
}

module.exports = ProductsAPI