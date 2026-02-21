import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { initDb } from '../db/index';
import authRoutes from '../routes/auth';
import resourceRoutes from '../routes/resources';

const PORT = 3001;

async function startServer() {
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
