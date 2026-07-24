/**
 * DynamoDB repository for Employee
 */
const {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require('@aws-sdk/lib-dynamodb');

const { docClient, TABLE_NAME } = require('../config/dynamodb');

/**
 * Create employee
 * @param {object} item
 */
async function createEmployee(item) {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  await docClient.send(new PutCommand(params));
  return item;
}

/**
 * Get employee by id
 */
async function getEmployee(employeeId) {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeId },
  };
  const result = await docClient.send(new GetCommand(params));
  return result.Item;
}

/**
 * Scan employees
 */
async function getEmployees() {
  const params = { TableName: TABLE_NAME };
  const result = await docClient.send(new ScanCommand(params));
  return result.Items || [];
}

/**
 * Update employee
 */
async function updateEmployee(employeeId, updates) {
  const expressionParts = [];
  const expressionValues = {};
  const expressionNames = {};
  let idx = 0;
  for (const [key, value] of Object.entries(updates)) {
    idx += 1;
    const nameKey = `#k${idx}`;
    const valKey = `:v${idx}`;
    expressionNames[nameKey] = key;
    expressionValues[valKey] = value;
    expressionParts.push(`${nameKey} = ${valKey}`);
  }

  const UpdateExpression = 'SET ' + expressionParts.join(', ');
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeId },
    UpdateExpression,
    ExpressionAttributeNames: expressionNames,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: 'ALL_NEW',
  };

  const result = await docClient.send(new UpdateCommand(params));
  return result.Attributes;
}

/**
 * Delete employee
 */
async function deleteEmployee(employeeId) {
  const params = {
    TableName: TABLE_NAME,
    Key: { employeeId },
  };
  await docClient.send(new DeleteCommand(params));
  return { employeeId };
}

module.exports = {
  createEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
