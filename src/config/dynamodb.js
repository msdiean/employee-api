/**
 * DynamoDB configuration
 * Creates a DynamoDBDocumentClient using AWS SDK v3
 */
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const REGION = process.env.AWS_REGION || 'us-east-1';
const TABLE_NAME = process.env.TABLE_NAME;

if (!TABLE_NAME) {
  console.error('Environment variable TABLE_NAME is required');
}

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);

module.exports = {
  docClient,
  TABLE_NAME,
};
