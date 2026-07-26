const index = require('../src/index');
const handler = require('../src/handlers/employeeHandler');

jest.mock('../src/handlers/employeeHandler', () => ({
  createEmployee: jest.fn(),
  getEmployees: jest.fn(),
  getEmployee: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
}));

describe('index router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('OPTIONS method returns CORS headers and 200 OK', async () => {
    const res = await index.handler({ httpMethod: 'OPTIONS', path: '/employees' });
    expect(res.statusCode).toBe(200);
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  test('POST /employees routes to createEmployee', async () => {
    handler.createEmployee.mockResolvedValue({ statusCode: 201, body: '{}' });
    const res = await index.handler({ httpMethod: 'POST', path: '/employees' });
    expect(handler.createEmployee).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
  });

  test('GET /employees routes to getEmployees', async () => {
    handler.getEmployees.mockResolvedValue({ statusCode: 200, body: '[]' });
    const res = await index.handler({ httpMethod: 'GET', path: '/employees' });
    expect(handler.getEmployees).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('GET /employees/123 routes to getEmployee', async () => {
    handler.getEmployee.mockResolvedValue({ statusCode: 200, body: '{}' });
    const res = await index.handler({ httpMethod: 'GET', path: '/employees/123' });
    expect(handler.getEmployee).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('PUT /employees/123 routes to updateEmployee', async () => {
    handler.updateEmployee.mockResolvedValue({ statusCode: 200, body: '{}' });
    const res = await index.handler({ httpMethod: 'PUT', path: '/employees/123' });
    expect(handler.updateEmployee).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('DELETE /employees/123 routes to deleteEmployee', async () => {
    handler.deleteEmployee.mockResolvedValue({ statusCode: 200, body: '{}' });
    const res = await index.handler({ httpMethod: 'DELETE', path: '/employees/123' });
    expect(handler.deleteEmployee).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('Unknown route returns 404', async () => {
    const res = await index.handler({ httpMethod: 'GET', path: '/unknown' });
    expect(res.statusCode).toBe(404);
  });
});
