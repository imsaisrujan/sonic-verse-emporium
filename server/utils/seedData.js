
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

// Add more albums
const additionalAlbums = [
  {
    id: '5',
    title: 'SOS',
    artist: 'SZA',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 12.99,
    genre: 'R&B/Soul',
    releaseDate: '2022-12-09',
    rating: 4.7,
    description: 'An emotionally rich album showcasing SZA\'s evolution as an artist with vulnerable lyrics and genre-bending production.',
    inStock: true,
    previewTrack: {
      id: 'track21',
      title: 'Kill Bill',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    tracks: [
      { id: 't21', title: 'Kill Bill', duration: '2:33', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't22', title: 'Seek & Destroy', duration: '3:23', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't23', title: 'Low', duration: '2:45', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ]
  },
  {
    id: '6',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    coverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 14.99,
    genre: 'Pop',
    releaseDate: '2021-07-30',
    rating: 4.6,
    description: 'A mature and introspective sophomore album that explores fame, power dynamics, and personal growth through innovative production.',
    inStock: true,
    previewTrack: {
      id: 'track26',
      title: 'Happier Than Ever',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    tracks: [
      { id: 't26', title: 'Happier Than Ever', duration: '4:58', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 't27', title: 'NDA', duration: '3:35', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 't28', title: 'Therefore I Am', duration: '2:54', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
    ]
  },
  {
    id: '7',
    title: 'An Evening With Silk Sonic',
    artist: 'Silk Sonic',
    coverImage: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 10.99,
    genre: 'R&B/Soul',
    releaseDate: '2021-11-12',
    rating: 4.9,
    description: 'A nostalgic tribute to 70s soul and funk from Bruno Mars and Anderson .Paak, crafting a retro yet fresh sonic experience.',
    inStock: true,
    previewTrack: {
      id: 'track31',
      title: 'Leave The Door Open',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    tracks: [
      { id: 't31', title: 'Leave The Door Open', duration: '3:24', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't32', title: 'Fly As Me', duration: '3:38', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't33', title: 'Smokin Out The Window', duration: '3:18', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ]
  },
  {
    id: '8',
    title: 'Wasteland',
    artist: 'Brent Faiyaz',
    coverImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 11.99,
    genre: 'R&B/Soul',
    releaseDate: '2022-07-08',
    rating: 4.4,
    description: 'A raw exploration of fame, relationships, and self-reflection delivered through atmospheric production and Brent\'s distinctive vocals.',
    inStock: true,
    previewTrack: {
      id: 'track36',
      title: 'ALL MINE',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    tracks: [
      { id: 't36', title: 'ALL MINE', duration: '2:39', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 't37', title: 'PRICE OF FAME', duration: '4:05', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
      { id: 't38', title: 'ROLLING STONE', duration: '3:28', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
    ]
  },
  {
    id: '9',
    title: 'Nectar',
    artist: 'Joji',
    coverImage: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 9.99,
    genre: 'Alternative',
    releaseDate: '2020-09-25',
    rating: 4.3,
    description: 'A melancholic journey through love and loss, showcasing Joji\'s growth as an artist with his signature lo-fi aesthetic and emotional depth.',
    inStock: true,
    previewTrack: {
      id: 'track41',
      title: 'Sanctuary',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    tracks: [
      { id: 't41', title: 'Sanctuary', duration: '3:00', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 't42', title: 'Run', duration: '3:15', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 't43', title: 'Gimme Love', duration: '3:34', previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ]
  }
];

// Combine all albums
const allAlbums = [...albumData, ...additionalAlbums];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/melody_music_store', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected successfully');
    
    // Clear existing data
    await Album.deleteMany();
    
    // Insert new data
    await Album.insertMany(allAlbums);
    
    console.log('Database seeded successfully');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    mongoose.connection.close();
  }
};

// Export both the data and the seeding function
module.exports = {
  albumData: allAlbums,
  seedDatabase
};
