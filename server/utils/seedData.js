
const mongoose = require('mongoose');
const Album = require('../models/Album');

// Sample data for albums
const albumData = [
  {
    id: '1',
    title: 'Dawn FM',
    artist: 'The Weeknd',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'R&B/Soul',
    releaseDate: '2022-01-07',
    rating: 4.5,
    description: 'Experience a journey of electrifying beats and soulful melodies that push the boundaries of contemporary R&B and pop music.',
    inStock: true,
    previewTrack: {
      id: 'track1',
      title: 'Dawn FM',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    tracks: [
      { id: 't1', title: 'Dawn FM', duration: '1:37', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't2', title: 'Gasoline', duration: '3:33', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't3', title: 'How Do I Make You Love Me?', duration: '3:34', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ]
  },
  {
    id: '2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
    genre: 'Pop',
    releaseDate: '2020-03-27',
    rating: 4.8,
    description: 'A masterful blend of retro disco and modern pop that creates an irresistible sonic landscape for dance and reflection.',
    inStock: true,
    previewTrack: {
      id: 'track6',
      title: 'Future Nostalgia',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    tracks: [
      { id: 't6', title: 'Future Nostalgia', duration: '3:04', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 't7', title: 'Don\'t Start Now', duration: '3:03', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 't8', title: 'Cool', duration: '3:29', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
    ]
  },
  {
    id: '3',
    title: 'Blonde',
    artist: 'Frank Ocean',
    coverImage: 'https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 13.99,
    genre: 'R&B/Soul',
    releaseDate: '2016-08-20',
    rating: 5.0,
    description: 'An introspective masterpiece that blends experimental R&B with poetic storytelling, creating a deeply personal musical experience.',
    inStock: true,
    previewTrack: {
      id: 'track11',
      title: 'Nikes',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    tracks: [
      { id: 't11', title: 'Nikes', duration: '5:14', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't12', title: 'Ivy', duration: '4:09', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't13', title: 'Pink + White', duration: '3:04', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ]
  },
  // More albums here...
  {
    id: '4',
    title: 'Utopia',
    artist: 'Travis Scott',
    coverImage: 'https://images.unsplash.com/photo-1504509546545-e000b4a62425?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'Hip-Hop',
    releaseDate: '2023-07-28',
    rating: 4.2,
    description: 'A psychedelic journey through Travis Scott\'s musical vision of utopia, featuring innovative production and star-studded collaborations.',
    inStock: true,
    previewTrack: {
      id: 'track16',
      title: 'HYAENA',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    tracks: [
      { id: 't16', title: 'HYAENA', duration: '3:47', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 't17', title: 'THANK GOD', duration: '2:56', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 't18', title: 'MODERN JAM', duration: '3:29', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
    ]
  }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/melody_music_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected successfully');
  
  try {
    // Clear existing data
    await Album.deleteMany();
    
    // Insert new data
    await Album.insertMany(albumData);
    
    console.log('Database seeded successfully');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
