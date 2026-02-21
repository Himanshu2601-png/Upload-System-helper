import { initDb } from '../src/db/index.js';
import authRoutes from '../src/routes/auth.js';
import resourceRoutes from '../src/routes/resources.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();

// Initialize Database
initDb();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

// Serve static files
app.use(express.static('dist'));

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

export default app;
