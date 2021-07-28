const express = require('express');
const router = express.Router();

const ProductsService = require('../services/products')

const multer = require('multer');
const mime = require('mime');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = "." + mime.getExtension(file.mimetype)
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
})

const upload = multer({ storage: storage })

const type = upload.single('recfile');

router.post('/upload', type, function (req, res, next) {
    console.log(req.file)
    console.log("!!")
})

module.exports = router