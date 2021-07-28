const express = require('express');
const router = express.Router();

const ProductsService = require('../services/products')

router.use(require('./product-image'))

router.post('/list', async function (req, res) {
    const serviceRes = await ProductsService.getList({
        // pagination: req.body.pagination
    })

    res.status(200).send(serviceRes)
})

router.post('/filters', async function (req, res) {
    let inStock = req.body.inStock
    let maxPrice = req.body.maxPrice
    let startsWith = req.body.startsWith
    let pageNumber = req.body.pageNumber

    let obj = {}
    if (inStock) {
        obj.minCount = 0
    }
    if (maxPrice) {
        obj.maxPrice = maxPrice
    }
    if (startsWith) {
        obj.innerName = startsWith
    }
    const serviceRes = await ProductsService.listByFilter(obj, {pagination: pageNumber, count: 6})
    res.status(200).send(serviceRes)
})

router.post('/save', async function (req, res) {
    let newName = req.body.properties.name
    let newPrice = req.body.properties.price
    let newCount = req.body.properties.count

    const serviceRes = await ProductsService.editById(req.body.id, {newName, newPrice, newCount})
    res.status(200).send({res: serviceRes})
})

router.post('/create', async function (req, res) {
    let name = req.body.name
    let price = req.body.price
    let count = req.body.count

    const serviceRes = await ProductsService.create({name, price, count})
    res.status(200).send({res: serviceRes})
})

router.post('/delete', async function (req, res) {
    const serviceRes = await ProductsService.deleteById(req.body.id)
    res.status(200).send(serviceRes)
})

router.get('/current/:name', async function (req, res) {
    const serviceRes = await ProductsService.getByName(req.params.name)
    console.log(serviceRes)
    if (serviceRes === null)
        return res.status(404).send("Not found")

    res.status(200).send(serviceRes)
})

router.post('/upload-image', (req, res) => {
    console.log(req.body);
    let sampleFile = req.files
    console.log(sampleFile);
})

module.exports = router;
