const { docClient } = require('../src/config/dynamodb');
const repository = require('../src/repositories/employeeRepository');

jest.mock('../src/config/dynamodb', () => {
  const sendMock = jest.fn();
  return {
    docClient: { send: sendMock },
    TABLE_NAME: 'EmployeesTableMock',
  };
});

describe('employeeRepository', () => {
  beforeEach(() => {
    require('../src/config/dynamodb').docClient.send.mockReset();
  });

  test('createEmployee calls put', async () => {
    const item = { employeeId: '1', firstName: 'a' };
    require('../src/config/dynamodb').docClient.send.mockResolvedValue({});
    const result = await repository.createEmployee(item);
    expect(result).toEqual(item);
    expect(require('../src/config/dynamodb').docClient.send).toHaveBeenCalled();
  });

  test('getEmployee returns item', async () => {
    const item = { employeeId: '1', firstName: 'a' };
    require('../src/config/dynamodb').docClient.send.mockResolvedValue({ Item: item });
    const result = await repository.getEmployee('1');
    expect(result).toEqual(item);
  });

  test('getEmployees returns items', async () => {
    const items = [{ employeeId: '1' }];
    require('../src/config/dynamodb').docClient.send.mockResolvedValue({ Items: items });
    const result = await repository.getEmployees();
    expect(result).toEqual(items);
  });

  test('updateEmployee returns attributes', async () => {
    const attrs = { employeeId: '1', firstName: 'b' };
    require('../src/config/dynamodb').docClient.send.mockResolvedValue({ Attributes: attrs });
    const result = await repository.updateEmployee('1', { firstName: 'b' });
    expect(result).toEqual(attrs);
  });

  test('deleteEmployee resolves', async () => {
    require('../src/config/dynamodb').docClient.send.mockResolvedValue({});
    const result = await repository.deleteEmployee('1');
    expect(result).toEqual({ employeeId: '1' });
  });
});
