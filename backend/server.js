require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./src/routes/weatherRoutes');
const { notFound, errorHandler } = require('./src/utils/errorHandlers');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

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
