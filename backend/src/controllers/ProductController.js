const express = require('express')

const Product = require('../models/Products')

const router = express.Router()

router.post('/registerProduct', async (req, res) => {
    try {
        const product = await Product.create(req.body)

        return res.send({ product })
    }catch(err) {
        return res.status(400).send({ error: 'Registration Failed' })
    }
})

module.exports = app => app.use('/registers', router)