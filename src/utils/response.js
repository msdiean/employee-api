/**
 * Response helper
 */
function json(body) {
  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function success(body) {
  return { statusCode: 200, ...json(body) };
}

function created(body) {
  return { statusCode: 201, ...json(body) };
}

function badRequest(message) {
  return { statusCode: 400, ...json({ message }) };
}

function notFound(message) {
  return { statusCode: 404, ...json({ message }) };
}

function serverError(message) {
  return { statusCode: 500, ...json({ message }) };
}

module.exports = {
  success,
  created,
  badRequest,
  notFound,
  serverError,
};
