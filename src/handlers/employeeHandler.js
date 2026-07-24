/**
 * Lambda handler layer for employee routes
 * No business logic here — only request/response mapping
 */
const service = require('../services/employeeService');
const response = require('../utils/response');

async function createEmployee(event) {
  try {
    const payload = JSON.parse(event.body || '{}');
    const created = await service.createEmployee(payload);
    return response.created(created);
  } catch (err) {
    console.error('createEmployee error', err);
    if (err && err.status === 400) return response.badRequest(err.message);
    return response.serverError('Internal server error');
  }
}

async function getEmployees() {
  try {
    const items = await service.getEmployees();
    return response.success(items);
  } catch (err) {
    console.error('getEmployees error', err);
    return response.serverError('Internal server error');
  }
}

async function getEmployee(event) {
  try {
    const { employeeId } = event.pathParameters || {};
    const item = await service.getEmployee(employeeId);
    return response.success(item);
  } catch (err) {
    console.error('getEmployee error', err);
    if (err && err.status === 400) return response.badRequest(err.message);
    if (err && err.status === 404) return response.notFound(err.message);
    return response.serverError('Internal server error');
  }
}

async function updateEmployee(event) {
  try {
    const { employeeId } = event.pathParameters || {};
    const payload = JSON.parse(event.body || '{}');
    const updated = await service.updateEmployee(employeeId, payload);
    return response.success(updated);
  } catch (err) {
    console.error('updateEmployee error', err);
    if (err && err.status === 400) return response.badRequest(err.message);
    if (err && err.status === 404) return response.notFound(err.message);
    return response.serverError('Internal server error');
  }
}

async function deleteEmployee(event) {
  try {
    const { employeeId } = event.pathParameters || {};
    const result = await service.deleteEmployee(employeeId);
    return response.success(result);
  } catch (err) {
    console.error('deleteEmployee error', err);
    if (err && err.status === 400) return response.badRequest(err.message);
    if (err && err.status === 404) return response.notFound(err.message);
    return response.serverError('Internal server error');
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
