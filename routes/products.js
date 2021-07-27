const express = require('express');
const router = express.Router();

const ProductsService = require('../services/products')

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/list', async function (req, res) {
    const serviceRes = await ProductsService.getList({
        // pagination: req.body.pagination
    })

    res.status(200).send(serviceRes)
})

router.get('/current/:name', async function (req, res) {
    const serviceRes = await ProductsService.getByName(req.params.name)
    console.log(serviceRes)
    if (serviceRes === null)
        return res.status(404).send("Not found")

    res.status(200).send(serviceRes)
})

router.get('/add/:name', async function (req, res) {
    const serviceRes = await ProductsService.create({name: req.params.name, count: 13})
    res.status(200).send(serviceRes)
})

router.get('/add1/:name', async function (req, res) {
    const serviceRes = await ProductsService.create({name: req.params.name, count: 0})
    res.status(200).send(serviceRes)
})

router.get('/delete/:name', async function (req, res) {
    const serviceRes = await ProductsService.deleteByName(req.params.name)
    res.status(200).send(serviceRes)
})

router.get('/in-stock', async function (req, res) {
    const serviceRes = await ProductsService.listByFilter({minCount: 0})
    res.status(200).send(serviceRes)
})

router.get('/not-in-stock', async function (req, res) {
    const serviceRes = await ProductsService.listByFilter({})
    res.status(200).send(serviceRes)
})


module.exports = router;
