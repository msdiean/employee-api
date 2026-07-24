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

  test('createEmployee calls repository and returns item', async () => {
    const payload = {
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      department: 'X',
      designation: 'Y',
      salary: 100,
    };
    repository.createEmployee.mockResolvedValue({ ...payload, employeeId: '1' });
    const result = await service.createEmployee(payload);
    expect(result.employeeId).toBeDefined();
    expect(repository.createEmployee).toHaveBeenCalled();
  });

  test('getEmployee returns item or 404', async () => {
    repository.getEmployee.mockResolvedValue(null);
    await expect(service.getEmployee('1')).rejects.toMatchObject({ status: 404 });
    const item = { employeeId: '1' };
    repository.getEmployee.mockResolvedValue(item);
    const result = await service.getEmployee('1');
    expect(result).toEqual(item);
  });

  test('updateEmployee validates and updates', async () => {
    repository.updateEmployee.mockResolvedValue({ employeeId: '1' });
    const result = await service.updateEmployee('1', { firstName: 'Z' });
    expect(result.employeeId).toBe('1');
  });

  test('deleteEmployee checks existence and deletes', async () => {
    repository.getEmployee.mockResolvedValue({ employeeId: '1' });
    repository.deleteEmployee.mockResolvedValue({ employeeId: '1' });
    const res = await service.deleteEmployee('1');
    expect(res).toEqual({ employeeId: '1' });
  });
});
