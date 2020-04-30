const express = require('express');
const router = express.Router();
const applePrice = require('../models/prices');

//// Get All prices

router.get('/', async (req, res) => {
    try {
        const StockPrice = await applePrice.find()
        res.json(StockPrice)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one price

router.get('/:id', getPrices, (req, res) => {
    res.json(res.StockPrice)
});

// Create one Price

router.post('/', async (req, res) => {
    const oneApplePrice = new applePrice({
        date: req.body.date,
        last: req.body.last,
        open: req.body.open,
        max: req.body.max,
        min: req.body.min,
        vol: req.body.vol,
        percent: req.body.percent
    });

    try {
        const currentPrice = await oneApplePrice.save()
        res.status(201).json(currentPrice)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Update one New

/*router.patch('/:id', getPrices, async (req, res) => {
    if (req.body.title != null) {
        res.getNew.title = req.body.title
    }

    if (req.body.description != null) {
        res.getNew.description = req.body.description
    }

    if (req.body.url != null) {
        res.getNew.url = req.body.url
    }

    if (req.body.date != null) {
        res.getNew.date = req.body.date
    }

    try {
        const updatedNew = await res.getNew.save()
        res.json(updatedNew)
    } catch {
        res.status(400).json({ message: err.message })
    }

});*/

// Delete one New

router.delete('/:id', getPrices, async (req, res) => {
    try {
        await res.getPrice.remove();
        res.json({ message: 'Deleted This Stock Price' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

async function getPrices(req, res, next) {
    try {
        getPrice = await applePrice.findById(req.params.id);
        if (getPrice == null) {
            return res.status(404).json({ message: 'Cant find subscriber'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.getPrice = getPrice;
    next()
}

module.exports = router;