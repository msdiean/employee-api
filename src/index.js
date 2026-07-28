/**
 * Lambda entry point and router
 */
const handler = require('./handlers/employeeHandler');

/**
 * Basic router for the API Gateway proxy events
 */
exports.handler = async (event) => {
  console.log('Event received:', JSON.stringify({ path: event.path, httpMethod: event.httpMethod }));

  const method = event.httpMethod;
  const path = event.path || '';

  // Handle CORS OPTIONS preflight request
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
      },
      body: JSON.stringify({ message: 'CORS Preflight OK' }),
    };
  }

  // POST /employees
  if (method === 'POST' && path === '/employees') {
    return handler.createEmployee(event);
  }

  // GET /employees - Simulated Crash only when ?crash=true parameter is passed
  if (method === 'GET' && path === '/employees') {
    if (event.queryStringParameters && event.queryStringParameters.crash === 'true') {
      throw new Error('Simulated Production Crash for Auto-Rollback Test!'); // NOSONAR
    }
    return handler.getEmployees(event);
  }

  // Routes with employeeId parameter: /employees/{employeeId}
  const employeeIdMatch = path.match(/^\/employees\/(.+)$/);
  if (employeeIdMatch) {
    // attach pathParameters for handler convenience
    event.pathParameters = event.pathParameters || {};
    event.pathParameters.employeeId = employeeIdMatch[1];

    if (method === 'GET') return handler.getEmployee(event);
    if (method === 'PUT') return handler.updateEmployee(event);
    if (method === 'DELETE') return handler.deleteEmployee(event);
  }

  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
    },
    body: JSON.stringify({ message: 'Not Found' }),
  };
};