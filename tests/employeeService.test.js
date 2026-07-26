const service = require('../src/services/employeeService');
const repository = require('../src/repositories/employeeRepository');

jest.mock('../src/repositories/employeeRepository');

describe('employeeService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('createEmployee validates required fields', async () => {
    await expect(service.createEmployee({})).rejects.toMatchObject({ status: 400 });
  });

  test('createEmployee validates email and salary', async () => {
    await expect(
      service.createEmployee({
        firstName: 'A',
        lastName: 'B',
        email: 'invalid',
        department: 'X',
        designation: 'Y',
        salary: 'not-numeric',
      })
    ).rejects.toMatchObject({ status: 400 });
  });

  test('createEmployee calls repository and returns item with hashed password if provided', async () => {
    const payload = {
      employeeId: 'emp-101',
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      department: 'X',
      designation: 'Y',
      salary: 100,
      password: 'SecretPassword123',
    };
    repository.createEmployee.mockImplementation(async (item) => item);

    const result = await service.createEmployee(payload);
    expect(result.employeeId).toBe('emp-101');
    expect(result.hashedPassword).toBeDefined();
    expect(result.hashedPassword).not.toBe('SecretPassword123'); // Hashed
    expect(repository.createEmployee).toHaveBeenCalled();
  });

  test('getEmployee returns item or 404', async () => {
    await expect(service.getEmployee(null)).rejects.toMatchObject({ status: 400 });
    repository.getEmployee.mockResolvedValue(null);
    await expect(service.getEmployee('1')).rejects.toMatchObject({ status: 404 });

    const item = { employeeId: '1' };
    repository.getEmployee.mockResolvedValue(item);
    const result = await service.getEmployee('1');
    expect(result).toEqual(item);
  });

  test('getEmployees returns all employees', async () => {
    repository.getEmployees.mockResolvedValue([{ employeeId: '1' }]);
    const result = await service.getEmployees();
    expect(result).toHaveLength(1);
  });

  test('updateEmployee validates email and salary and hashes password if updated', async () => {
    await expect(service.updateEmployee(null, {})).rejects.toMatchObject({ status: 400 });
    await expect(service.updateEmployee('1', { email: 'invalid' })).rejects.toMatchObject({ status: 400 });
    await expect(service.updateEmployee('1', { salary: 'abc' })).rejects.toMatchObject({ status: 400 });

    repository.updateEmployee.mockResolvedValue({ employeeId: '1', hashedPassword: 'hashed' });
    const result = await service.updateEmployee('1', { password: 'NewPassword', salary: '500' });
    expect(repository.updateEmployee).toHaveBeenCalled();
    expect(result.employeeId).toBe('1');
  });

  test('updateEmployee throws 404 if employee not found', async () => {
    repository.updateEmployee.mockResolvedValue(null);
    await expect(service.updateEmployee('99', { firstName: 'Updated' })).rejects.toMatchObject({ status: 404 });
  });

  test('deleteEmployee checks existence and deletes', async () => {
    await expect(service.deleteEmployee(null)).rejects.toMatchObject({ status: 400 });

    repository.getEmployee.mockResolvedValue(null);
    await expect(service.deleteEmployee('99')).rejects.toMatchObject({ status: 404 });

    repository.getEmployee.mockResolvedValue({ employeeId: '1' });
    repository.deleteEmployee.mockResolvedValue({ employeeId: '1' });
    const res = await service.deleteEmployee('1');
    expect(res).toEqual({ employeeId: '1' });
  });
});
