# Cosma Beauty - Fullstack Application

## Overview
Cosma Beauty is a fullstack web application built with **React (Vite + Tailwind CSS)** for the frontend and **Node.js (Express + MongoDB)** for the backend.  
It allows users to browse/search beauty products and submit enquiries that are stored in MongoDB.

---




## Technologies Used
### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/cosma-beauty.git
cd cosma-beauty
```

### 2. Frontend Setup
```bash

cd frontend
npm install
npm run dev
```
👉 Runs on http://localhost:5173

### 3. Backend Setup
```bash

cd backend
npm install

```
#### Create a .env file inside backend with: env
#### MONGO_URI=mongodb://localhost:27017/cosma_beauty
#### PORT=5000
#### JWT_SECRET=your_secret_key


### 4.Start backend:

```bash
npm start
```
👉 Runs on http://localhost:5000

### Run Instructions
Start backend server (port 5000 by default):

```bash
cd backend
npm start
```
### Start frontend server (port 5173 by default for Vite):

```bash

cd frontend && npm run dev
```
#### Open the frontend in browser:

#### http://localhost:5173
## API Documentation

### 5.Base URL
http://localhost:5000
#### Endpoints
1. Submit Enquiry
POST /enquiries

Body:

```json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I want to know more about your products."
}
```
Response:

```json

{
  "success": true,
  "message": "Enquiry submitted successfully!"
}
```
2. Get All Enquiries (Admin)
GET /enquiries

Response:

```json

[
  {
    "_id": "64abf3d9e1a7d0a123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I want to know more about your products."
  }
]
```
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

Contact
For questions or support, please contact:
📧 bhavanibojadla8@gmail.com
