const express = require('express');
const router = express.Router();
const appleNew = require('../models/new');

// Get all News

router.get('/', async (req, res) => {
    try {
        const applesNews = await appleNew.find()
        res.json(applesNews)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one New

router.get('/:id', getNews, (req, res) => {
    res.json(res.appleNews)
});

// Create one New

router.post('/', async (req, res) => {
    const oneAppleNew = new appleNew({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        date: req.body.date
    });

    try {
        const currentNew = await oneAppleNew.save()
        res.status(201).json(currentNew)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Update one New

router.patch('/:id', getNews, async (req, res) => {
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

});

// Delete one New

router.delete('/:id', getNews, async (req, res) => {
    try {
        await res.getNew.remove()
        res.json({ message: 'Deleted This New' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

async function getNews(req, res, next) {
    try {
        getNew = await appleNew.findById(req.params.id)
        if (getNew == null) {
            return res.status(404).json({ message: 'Cant find subscriber'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.getNew = getNew
    next()
}


module.exports = router

