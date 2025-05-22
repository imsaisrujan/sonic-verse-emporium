
const Album = require('../models/Album');
const albumData = require('../utils/seedData');

// Get all albums
exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums', error: error.message });
  }
};

// Get album by ID
exports.getAlbumById = async (req, res) => {
  try {
    const album = await Album.findOne({ id: req.params.id });
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching album', error: error.message });
  }
};

// Get new releases
exports.getNewReleases = async (req, res) => {
  try {
    // Fetch the 8 most recent albums by release date
    const newReleases = await Album.find()
      .sort({ releaseDate: -1 })
      .limit(8);
      
    res.status(200).json(newReleases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new releases', error: error.message });
  }
};

// Get top sellers
exports.getTopSellers = async (req, res) => {
  try {
    // Fetch top rated albums
    const topSellers = await Album.find()
      .sort({ rating: -1 })
      .limit(8);
      
    res.status(200).json(topSellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top sellers', error: error.message });
  }
};

// Get featured albums
exports.getFeaturedAlbums = async (req, res) => {
  try {
    // For now, just return 4 random albums
    const featuredAlbums = await Album.aggregate([
      { $sample: { size: 4 } }
    ]);
    
    res.status(200).json(featuredAlbums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured albums', error: error.message });
  }
};

// Get albums by genre
exports.getAlbumsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const albums = await Album.find({ genre });
    
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums by genre', error: error.message });
  }
};

// Seed the database with initial data
exports.seedDatabase = async (req, res) => {
  try {
    // Import album data
    const { albumData } = require('../utils/seedData');
    
    // Count existing albums
    const existingCount = await Album.countDocuments();
    
    // If database is empty, seed it
    if (existingCount === 0) {
      await Album.insertMany(albumData);
      return res.status(201).json({ 
        message: 'Database seeded successfully', 
        count: albumData.length 
      });
    }
    
    // If we have some data but not all, add the missing ones
    const addedAlbums = [];
    for (const album of albumData) {
      const exists = await Album.findOne({ id: album.id });
      if (!exists) {
        await Album.create(album);
        addedAlbums.push(album);
      }
    }
    
    return res.status(200).json({ 
      message: 'Database updated with new entries', 
      count: addedAlbums.length 
    });
    
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ 
      message: 'Error seeding database', 
      error: error.message 
    });
  }
};
