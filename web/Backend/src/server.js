import express from 'express'
import cors from 'cors'
import {config}  from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import apiRoutes from './routes/index.js'
import errorHandler from './middleware/errorMiddleware.js'

import http from 'http';
import { initSocket } from './socket/socket.js';

// dotenv and DB connection
config();
connectDB();

const app = express();
const server = http.createServer(app);
initSocket(server);

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://mern-crm-eta.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

//auth routes and protected routes
app.use('/api/auth', authRoutes);

//api endpoint
app.use('/api', apiRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN CRM Backend is running 🚀",
  });
});

server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})

