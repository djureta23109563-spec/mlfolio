// config.js
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction
  ? 'https://mobafolio-backend.onrender.com/api'
  : 'http://localhost:5000/api';

export const UPLOADS_URL = isProduction
  ? 'https://mobafolio-backend.onrender.com/uploads'
  : 'http://localhost:5000/uploads';

console.log('🔧 Config loaded:', { isProduction, API_URL, UPLOADS_URL });