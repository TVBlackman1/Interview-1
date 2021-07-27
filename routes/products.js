const express = require('express');
const router = express.Router();

const productsService = require('../services/products')

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/list', async function (req, res) {
    const serviceRes = await productsService.getList({
        // pagination: req.body.pagination
    })

    res.status(200).send(serviceRes)
})

module.exports = router;
