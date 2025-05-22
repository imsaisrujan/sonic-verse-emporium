
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// GET all albums
router.get('/', albumController.getAlbums);

// GET featured albums
router.get('/featured', albumController.getFeaturedAlbums);

// GET new releases
router.get('/new-releases', albumController.getNewReleases);

// GET top sellers
router.get('/top-sellers', albumController.getTopSellers);

// GET albums by genre
router.get('/genre/:genre', albumController.getAlbumsByGenre);

// GET single album by ID
router.get('/:id', albumController.getAlbumById);

// POST seed the database
router.post('/seed', albumController.seedDatabase);

module.exports = router;
