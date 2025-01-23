# Next.js CRUD APP Testing

This repository contains a simple Next.js 13 application that demonstrates CRUD (Create, Read, Update, Delete) operations. The application allows users to perform basic CRUD actions on a dataset, providing a practical example of how to implement these operations using Next.js 13.

## Features

- Create: Add new products to the dataset through a user-friendly interface
- View: View the existing dataset and browse through the items.
- Update: Edit the information of any product in the dataset effortlessly.
- Delete: Remove product from the dataset with a confirmation prompt



## Installation

- Clone the repository to your local machine.
  Install my-project with npm

```bash
git clone https://github.com/your-username/nextjs-13-crud-operations.git
cd nextjs-13-crud-operations
```

- Install the dependencies using npm or yarn.

```bash
npm install
# or
yarn install
```
## Setting Up MongoDB Atlas

To set up MongoDB Atlas for your project, follow these steps:

1. **Create a MongoDB Atlas account**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
   - Sign up for an account or log in if you already have one.

2. **Create a new Cluster**:
   - After logging in, create a new cluster by following the instructions provided on the MongoDB Atlas dashboard.

3. **Get Your MongoDB Atlas Connection String**:
   - Once your cluster is set up, navigate to the *Connect* tab on your cluster dashboard.
   - Choose "Connect your application" and copy the connection string provided. It will look like this:
     ```bash
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
     ```

4. **Update Your `.env` File**:
   - In your project, open or create a `.env` file in the root directory.
   - Replace `<username>`, `<password>`, and `<database>` with your actual credentials and database name in the connection string. Example:
     ```bash
     MONGODB_URI=mongodb+srv://myUser:myPassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
     ```

5. **Start Your Application**:
   - Once your `.env` file is updated, you should be ready to connect to MongoDB Atlas from your app.





## Start the development server.

```bash
npm run dev
# or
yarn dev
```

- Open your browser and navigate to http://localhost:3000 to access the application.



### Setting Up Cypress
1. Install Cypress:
   ```bash
   npm install cypress --save-dev
   ```
2. Open Cypress test runner:
   ```bash
   npx cypress open
   ```

### Running Tests
To execute all test cases directly, use:
```bash
npx cypress run
```

## Technologies Used
- Next.js 13
- MongoDB
- Mongoose
- React Hook Form
- Bootstrap
- Cypress for Testing


