require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./src/routes/weatherRoutes');
const { notFound, errorHandler } = require('./src/utils/errorHandlers');

const app = express();

const allowedOrigins = [
  'https://skycast-xi-ecru.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));app.use(express.json());


app.use((req, _res, next) => {
  if (req.url.startsWith('/backend/api')) {
    req.url = req.url.replace('/backend/api', '') || '/';
  }
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/weather', weatherRoutes);
app.use('/weather', weatherRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SkyCast API running on port ${PORT}`);
  });
}

module.exports = app;
