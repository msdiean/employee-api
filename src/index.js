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

  // POST /employees
  if (method === 'POST' && path === '/employees') {
    return handler.createEmployee(event);
  }

  // GET /employees
  if (method === 'GET' && path === '/employees') {
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Not Found' }),
  };
};
exports.handler = async (event) => {

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Welcome to Employee Management API",
            method: event.httpMethod,
            path: event.path
        })
    };

};