/**
 * Response helper
 */
function json(body) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
    },
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
