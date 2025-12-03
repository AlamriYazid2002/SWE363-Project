# 🚀 SWE363 — Back-End API (Milestone 5)

This folder contains the Node.js + Express.js backend for the SWE363 project.
The backend handles authentication, event management, user roles, MongoDB operations, and integrates with a MongoDB Atlas cloud database.

## 📦 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Joi Validation
- Nodemon
- CORS

## ⚙️ Getting Started
1️⃣ **Install dependencies**
```
cd server
npm install
```

2️⃣ **Create an .env file**
```
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=supersecret
PORT=5000
```
A sample file `.env.sample` is provided.

## ▶️ Running the Server (Development)
```
npm run dev
```
Expected console output:
```
[dotenv] injecting env
✅ MongoDB connected
🚀 :5000
```

## 🗂 Folder Structure
```
server/
  src/
    app.js
    db.js
    models/
      User.js
      Event.js
    routes/
      auth.routes.js
      events.routes.js
      users.routes.js
    controllers/
      events.controller.js
    middleware/
      auth.js
      validate.js
      notFound.js
      error.js
    validation/
      auth.validation.js
      event.validation.js
    utils/
      ApiError.js
```

## 🔐 Authentication
**POST /api/auth/register**
- Registers a new user.
- Roles: student | organizer | admin

**POST /api/auth/login**
- Returns a JWT token:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

**GET /api/me**
- Authorization: Bearer <token>
- Returns:
```
{
  "id": "...",
  "role": "organizer"
}
```

## 🎟️ Events API
**GET /api/events**
- Supports:
  - search=keyword
  - category=tech
  - status=pending
  - page=1
  - limit=10
- Example:
```
/api/events?search=AI&category=tech&page=1&limit=5
```

**POST /api/events**
- Requires role: organizer or admin
- Body:
```
{
  "title": "AI Workshop",
  "category": "tech",
  "capacity": 50,
  "startAt": "...",
  "endAt": "...",
  "venue": "KFUPM Hall A",
  "description": "Hands-on"
}
```

**PATCH /api/events/:id**
- Only the event’s organizer or an admin may update.

**DELETE /api/events/:id**
- Only the organizer or an admin may delete.

## ✔️ Validation (Joi)
All incoming requests are validated using Joi.
Examples of rejected inputs:

- Missing title → 400
- Invalid email → 400
- Role not allowed → 400

## ❌ Error & Not Found Handling
All responses follow a consistent format:

Validation error:
```
{
  "error": "Validation error",
  "details": [ ... ]
}
```

404 route:
```
{
  "error": "Route not found"
}
```

## 🧪 Testing
Use:
- Postman
- cURL
- VS Code REST Client (optional test.http)

Example login request:
```
POST /api/auth/login
{
  "email": "org@test.com",
  "password": "P@ssw0rd!"
}
```

## 👥 Team Members
This backend was developed collaboratively as part of SWE363 — Web Development.

Team Members:
- ABDULJALIL ALSHAQAQIQ — 202153090
- MOAYED ALJADDAWI — 202248800
- NAIF ALFAREED — 201866440
- YAZID ALAMRI — 202176430

## 🏁 Milestone 5 Completed
This backend includes:
- ✔ Node + Express setup
- ✔ MongoDB integration
- ✔ Authentication & authorization
- ✔ Events CRUD
- ✔ Query filtering & pagination
- ✔ Joi Validation
- ✔ Centralized error handling
- ✔ Complete documentation


⭐ END OF README
