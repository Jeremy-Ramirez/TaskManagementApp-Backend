# AWS Lambda: Mark Task as Done (task-done-lambda)

This directory contains the source code for an AWS Lambda function designed to mark a specific task as "done" in a MongoDB database.

## 📋 Functionality

The function performs the following steps:

1.  **Database Connection**: Connects to a MongoDB cluster using the URI provided in the environment variables. It caches the connection to reuse it in future executions and optimize performance.
2.  **Validation**: Verifies that the request body contains the `taskId` and `userId` fields, and validates that the `taskId` has the correct format of a MongoDB ObjectId.
3.  **Update**: Searches the `tasks` collection for a task matching the provided ID and user.
4.  **Result**:
    - If found, updates its status to `"done"`.
    - If not found or does not belong to the user, returns a 404 error.

## 🛠 Requirements

- **Node.js**: Node.js compatible execution environment (e.g., Node.js 18.x, 20.x).
- **Dependencies**: `mongodb` library (defined in `package.json`).
- **Environment Variables**:
  - `MONGODB_URI`: Connection string to your MongoDB cluster.

## 🚀 How to Deploy on AWS Lambda

Follow these steps to deploy this code to AWS:

### 1. Local Preparation

Make sure you are in the `AwsLambda-task-done` folder and have Node.js installed.

```bash
# Install necessary dependencies
npm install
```

This will generate the `node_modules` folder.

### 2. Create Deployment Package (.zip)

To upload the code to Lambda, you need to create a `.zip` file containing:

- The `index.js` file
- The `package.json` file
- The `node_modules` folder

**Important**: Do not compress the `AwsLambda-task-done` folder itself. You must enter the folder, select the files, and compress them directly.

- On Windows: Select files -> Right click -> Send to -> Compressed (zipped) folder.

### 3. Create Function in AWS

1.  Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda).
2.  Click on **"Create function"**.
3.  Select **"Author from scratch"**.
4.  **Function name**: E.g., `markTaskDone`.
5.  **Runtime**: Select `Node.js 20.x` (or your preferred version).
6.  Click on **"Create function"**.

### 4. Upload Code

1.  On your function page, go to the **"Code"** tab.
2.  On the right, find the **"Upload from"** button and select **".zip file"**.
3.  Upload the `.zip` file you created in step 2.

### 5. Configure Environment Variables

1.  Go to the **"Configuration"** tab and select **"Environment variables"** from the side menu.
2.  Click on **"Edit"**.
3.  Add a new variable:
    - **Key**: `MONGODB_URI`
    - **Value**: Your MongoDB connection string (e.g., `mongodb+srv://user:password@cluster...`).
4.  Save changes.

### 6. Test the Function

You can create a test event in the Lambda console to verify it works.
Use this JSON as a template (make sure to use real IDs from your database):

```json
{
  "body": "{\"taskId\": \"65c4...your_real_id...\", \"userId\": \"user_123\"}"
}
```

_Note: The function expects to receive data within a `body` object (typical for API Gateway integrations) or directly in the event if the code is adjusted, but it is currently optimized to parse `event.body`._
