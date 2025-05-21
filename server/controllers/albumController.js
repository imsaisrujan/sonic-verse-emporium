
const Album = require('../models/Album');

// Get all albums
exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single album
exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findOne({ id: req.params.id });
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get new releases
exports.getNewReleases = async (req, res) => {
  try {
    // Get the most recent albums by release date
    const newReleases = await Album.find()
      .sort({ releaseDate: -1 })
      .limit(8);
      
    res.json(newReleases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top sellers
exports.getTopSellers = async (req, res) => {
  try {
    // In a real app, this would use sales data
    // For now, we'll just use highest rated albums
    const topSellers = await Album.find()
      .sort({ rating: -1 })
      .limit(8);
      
    res.json(topSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get featured albums
exports.getFeaturedAlbums = async (req, res) => {
  try {
    // For featured, we'll pick some albums with high ratings and good descriptions
    const featuredAlbums = await Album.find({ description: { $exists: true, $ne: "" } })
      .sort({ rating: -1 })
      .limit(3);
      
    res.json(featuredAlbums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get albums by genre
exports.getAlbumsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const albums = await Album.find({ genre: new RegExp(genre, 'i') });
    
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
