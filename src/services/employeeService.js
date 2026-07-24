/**
 * Business logic for Employee
 */
const { v4: uuidv4 } = require('uuid');
const Employee = require('../models/employee');
const repository = require('../repositories/employeeRepository');

/**
 * Simple email validation
 */
function isEmail(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

function isNumeric(value) {
  return !Number.isNaN(Number(value));
}

async function createEmployee(payload) {
  // validation
  const required = ['firstName', 'lastName', 'email', 'department', 'designation', 'salary'];
  for (const field of required) {
    if (!payload[field]) {
      throw { status: 400, message: `${field} is required` };
    }
  }
  if (!isEmail(payload.email)) {
    throw { status: 400, message: 'Invalid email format' };
  }
  if (!isNumeric(payload.salary)) {
    throw { status: 400, message: 'Salary must be numeric' };
  }

  const now = new Date().toISOString();
  const employeeId = uuidv4();
  const employee = new Employee({
    employeeId,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    department: payload.department,
    designation: payload.designation,
    salary: Number(payload.salary),
    createdAt: now,
    updatedAt: now,
  });

  const created = await repository.createEmployee(employee.toItem());
  return created;
}

async function getEmployee(employeeId) {
  if (!employeeId) throw { status: 400, message: 'employeeId is required' };
  const item = await repository.getEmployee(employeeId);
  if (!item) throw { status: 404, message: 'Employee not found' };
  return item;
}

async function getEmployees() {
  const items = await repository.getEmployees();
  return items;
}

async function updateEmployee(employeeId, payload) {
  if (!employeeId) throw { status: 400, message: 'employeeId is required' };
  if (payload.email && !isEmail(payload.email)) {
    throw { status: 400, message: 'Invalid email format' };
  }
  if (payload.salary && !isNumeric(payload.salary)) {
    throw { status: 400, message: 'Salary must be numeric' };
  }

  const updates = { ...payload };
  updates.updatedAt = new Date().toISOString();
  if (updates.salary) updates.salary = Number(updates.salary);

  const updated = await repository.updateEmployee(employeeId, updates);
  if (!updated) throw { status: 404, message: 'Employee not found' };
  return updated;
}

async function deleteEmployee(employeeId) {
  if (!employeeId) throw { status: 400, message: 'employeeId is required' };
  // ensure exists
  const existing = await repository.getEmployee(employeeId);
  if (!existing) throw { status: 404, message: 'Employee not found' };
  await repository.deleteEmployee(employeeId);
  return { employeeId };
}

module.exports = {
  createEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
