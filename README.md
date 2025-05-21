
# Melody Music Store - MERN Stack Application

A full-stack music store application built using MongoDB, Express.js, React, and Node.js.

## Project Structure

- `src/` - Frontend React application
- `server/` - Backend Express.js API
- `server.js` - Main server entry point

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd melody-music-store
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up MongoDB
   - Start your local MongoDB server or use MongoDB Atlas
   - Update the connection string in `server.js` if necessary

### Seed the Database

Populate the database with initial data:

```
node server/utils/seedData.js
```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
   
   This will start both the frontend and backend servers.

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## API Endpoints

### Albums
- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album by ID
- `GET /api/albums/featured` - Get featured albums
- `GET /api/albums/new-releases` - Get new releases
- `GET /api/albums/top-sellers` - Get top selling albums
- `GET /api/albums/genre/:genre` - Get albums by genre

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update-quantity` - Update cart item quantity (protected)
- `DELETE /api/cart/remove/:albumId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

## Features

- User authentication and authorization
- Browse music albums by category
- Featured albums and new releases
- Shopping cart functionality
- User profiles
- Responsive design

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - TanStack Query
  - Tailwind CSS
  - Shadcn/UI components

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT Authentication

## License

This project is licensed under the MIT License.
