const response = require('../src/utils/response');

describe('response utility', () => {
  test('success formats 200 with CORS', () => {
    const res = response.success({ ok: true });
    expect(res.statusCode).toBe(200);
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(res.body)).toEqual({ ok: true });
  });

  test('created formats 201 with CORS', () => {
    const res = response.created({ id: '1' });
    expect(res.statusCode).toBe(201);
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  test('badRequest formats 400', () => {
    const res = response.badRequest('Invalid parameter');
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body)).toEqual({ message: 'Invalid parameter' });
  });

  test('notFound formats 404', () => {
    const res = response.notFound('Resource missing');
    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.body)).toEqual({ message: 'Resource missing' });
  });

  test('serverError formats 500', () => {
    const res = response.serverError('Internal failure');
    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({ message: 'Internal failure' });
  });
});
