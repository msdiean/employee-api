# employee-api

Serverless Employee Management CRUD API for AWS Lambda (Node.js 22)

## Project Overview

This repository contains a production-oriented Serverless Employee Management API implemented for AWS Lambda using Node.js 22, CommonJS modules, and AWS SDK v3. It follows Clean Architecture and SOLID principles.

## Architecture

Client -> API Gateway -> Lambda -> index.js -> handlers -> services -> repositories -> DynamoDB

## Folder Structure

- src/
  - index.js (Lambda entry)
  - config/
    - dynamodb.js
  - handlers/
    - employeeHandler.js
  - services/
    - employeeService.js
  - repositories/
    - employeeRepository.js
  - models/
    - employee.js
  - utils/
    - response.js
- tests/

## Installation

Install dependencies:

```bash
npm install
```

## Running Tests

```bash
npm test
```

## Environment Variables

- `TABLE_NAME` - DynamoDB table name
- `AWS_REGION` - AWS region (optional; the SDK will use default credentials/environment)

## API Endpoints

- POST /employees — create employee
- GET /employees — list employees
- GET /employees/{employeeId} — get single employee
- PUT /employees/{employeeId} — update employee
- DELETE /employees/{employeeId} — delete employee

## Sample Request (Create)

POST /employees
```
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": 120000
}
```

## Sample Response (201)

```
{
  "employeeId": "uuid",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": 120000,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

## Lambda Handler

Entry point: `src/index.js`

## Future

This repository intentionally omits infrastructure-as-code and CI/CD definitions. Use Terraform, CloudFormation, SAM, or the Serverless Framework to deploy the Lambda and the DynamoDB table.
