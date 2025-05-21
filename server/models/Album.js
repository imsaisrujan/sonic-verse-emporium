
const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  id: String,
  title: String,
  duration: String,
  previewUrl: String
});

const AlbumSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  genre: String,
  releaseDate: String,
  rating: Number,
  description: String,
  inStock: {
    type: Boolean,
    default: true
  },
  previewTrack: {
    id: String,
    title: String,
    audioUrl: String
  },
  tracks: [TrackSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema);
