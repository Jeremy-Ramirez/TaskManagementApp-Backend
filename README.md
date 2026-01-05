

Built with **NestJS**, **MongoDB**, and **AWS Cognito**.

## 🚀 Features implemented

- **Framework**: NestJS (TypeScript).
- **Database**: MongoDB (Mongoose) integration.
- **Authentication**: AWS Cognito (JWT Strategy with RSA verification).
- **CRUD Operations**: Complete management for Tasks (Create, Read, Update, Delete).
- **Mark as Done**: 'Done' status supported via Web Service / API.
- **Documentation**: Swagger / OpenAPI integration.
- **Testing**: Unit Tests (Jest) and E2E Tests (Supertest).
- **Security**: CORS enabled, Validation Pipes, Auth Guards.

## 🛠️ Stack

- **Node.js**
- **NestJS** v11
- **TypeScript**
- **Mongoose**
- **Passport-JWT** (AWS Cognito)
- **Swagger**

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd backend-insightt
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/insightt-db

   # AWS Cognito
   AWS_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
   AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   AWS_COGNITO_REGION=us-east-1

   # Server
   PORT=3001
   ```

## 🏃‍♂️ Running the app

```bash
# development
$ npm run start

# watch mode (recommended for dev)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 📖 API Documentation (Swagger)

Once the application is running, you can access the interactive API documentation at:

- **URL**: `http://localhost:3001/api/docs`

Here you can test all endpoints directly from the browser (Authentication required via Bearer Token).

## 🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📁 Project Structure

- `src/auth`: Authentication logic (JWT Strategy, AWS Cognito integration).
- `src/tasks`: Feature module for Tasks (Controller, Service, DTOs, Schemas).
- `src/common`: Shared utilities (Pipes, Filters).
- `test`: End-to-End (E2E) test specifications.
- `AwsLambda-task-done`: AWS Lambda function code (JavaScript) to mark tasks as "done", including deployment instructions.

## License

This project is UNLICENSED.
