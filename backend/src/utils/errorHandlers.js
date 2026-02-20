function notFound(req, res, next) {
  res.status(404).json({ error: 'Route not found.' });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Server error.';
  res.status(status).json({ error: message });
}

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

module.exports = {
  notFound,
  errorHandler,
  badRequest
};
