const handler = require('../src/handlers/employeeHandler');
const service = require('../src/services/employeeService');

jest.mock('../src/services/employeeService');

describe('employeeHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    test('successful creation returns 201', async () => {
      service.createEmployee.mockResolvedValue({ employeeId: '1' });
      const res = await handler.createEmployee({ body: JSON.stringify({ firstName: 'A' }) });
      expect(res.statusCode).toBe(201);
    });

    test('bad request error returns 400', async () => {
      service.createEmployee.mockRejectedValue({ status: 400, message: 'Invalid input' });
      const res = await handler.createEmployee({ body: '{}' });
      expect(res.statusCode).toBe(400);
    });

    test('unexpected error returns 500', async () => {
      service.createEmployee.mockRejectedValue(new Error('DB failure'));
      const res = await handler.createEmployee({ body: '{}' });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('getEmployees', () => {
    test('returns 200 with list', async () => {
      service.getEmployees.mockResolvedValue([{ employeeId: '1' }]);
      const res = await handler.getEmployees();
      expect(res.statusCode).toBe(200);
    });

    test('unexpected error returns 500', async () => {
      service.getEmployees.mockRejectedValue(new Error('Failure'));
      const res = await handler.getEmployees();
      expect(res.statusCode).toBe(500);
    });
  });

  describe('getEmployee', () => {
    test('returns 200 on success', async () => {
      service.getEmployee.mockResolvedValue({ employeeId: '1' });
      const res = await handler.getEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(200);
    });

    test('returns 400 on status 400', async () => {
      service.getEmployee.mockRejectedValue({ status: 400, message: 'Missing id' });
      const res = await handler.getEmployee({});
      expect(res.statusCode).toBe(400);
    });

    test('returns 404 on status 404', async () => {
      service.getEmployee.mockRejectedValue({ status: 404, message: 'Not found' });
      const res = await handler.getEmployee({ pathParameters: { employeeId: '99' } });
      expect(res.statusCode).toBe(404);
    });

    test('returns 500 on unhandled error', async () => {
      service.getEmployee.mockRejectedValue(new Error('Unknown'));
      const res = await handler.getEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('updateEmployee', () => {
    test('returns 200 on success', async () => {
      service.updateEmployee.mockResolvedValue({ employeeId: '1' });
      const res = await handler.updateEmployee({ pathParameters: { employeeId: '1' }, body: '{}' });
      expect(res.statusCode).toBe(200);
    });

    test('returns 400 on status 400', async () => {
      service.updateEmployee.mockRejectedValue({ status: 400, message: 'Bad' });
      const res = await handler.updateEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(400);
    });

    test('returns 404 on status 404', async () => {
      service.updateEmployee.mockRejectedValue({ status: 404, message: 'Not found' });
      const res = await handler.updateEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(404);
    });

    test('returns 500 on unexpected error', async () => {
      service.updateEmployee.mockRejectedValue(new Error('Error'));
      const res = await handler.updateEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(500);
    });
  });

  describe('deleteEmployee', () => {
    test('returns 200 on success', async () => {
      service.deleteEmployee.mockResolvedValue({ employeeId: '1' });
      const res = await handler.deleteEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(200);
    });

    test('returns 400 on status 400', async () => {
      service.deleteEmployee.mockRejectedValue({ status: 400, message: 'Bad' });
      const res = await handler.deleteEmployee({});
      expect(res.statusCode).toBe(400);
    });

    test('returns 404 on status 404', async () => {
      service.deleteEmployee.mockRejectedValue({ status: 404, message: 'Not found' });
      const res = await handler.deleteEmployee({ pathParameters: { employeeId: '99' } });
      expect(res.statusCode).toBe(404);
    });

    test('returns 500 on unexpected error', async () => {
      service.deleteEmployee.mockRejectedValue(new Error('Error'));
      const res = await handler.deleteEmployee({ pathParameters: { employeeId: '1' } });
      expect(res.statusCode).toBe(500);
    });
  });
});
