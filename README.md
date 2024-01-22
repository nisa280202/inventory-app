# Inventory App - ReactJS & Node.js

*Made by* **Nisa Alivia**

## Installation

1. **Clone the Repository:**

   ```bash
   HTTPS
   git clone https://github.com/nisa280202/inventory-app.git

   SSH
   git clone git@github.com:nisa280202/inventory-app.git

   cd inventory-app

2. **Install Frontend Dependencies:**

   ```bash
   cd inventory-app-web-client

   npm install

3. **Install Backend Dependencies:**

   ```bash
   cd inventory-app-api

   npm install

4. **Database Connection Setup:**

   ```javascript
   // config/Database.js

   import { Sequelize } from "sequelize"

   const db = new Sequelize('inventory', 'postgres', 'root', {
      host: 'localhost',
      dialect: 'postgres'
   })

   export default db
   ```
   Customize the database credentials based on your PostgreSQL setup:

   - **'inventory'**: Replace with the name of your desired database.
   - **'postgres'**: Replace with your PostgreSQL username.
   - **'root'**: Replace with your PostgreSQL password.
   - **'localhost'**: Replace with the host address of your PostgreSQL server.
   - **'postgres'**: Set the dialect to 'postgres'.
   
5. **Run Database Migration:**

   Open file **index.js** and then uncomment line 5 and line 19 - 21. 

   ```javascript
   // line 5
   import db from "./config/Database.js"

   // line 19 - 21
   (async() => {
      await db.sync()
   })()
   ```

   Run **npm start** to perform database sync. 

6. **Run Seeder for Superadmin:**

   ```bash
   npm run seed:admin
   ```

## Running the Application

1. **Start the Backend (from the `inventory-app-api` directory):**

   ```bash
   npm start

2. **Start the Frontend (from the `inventory-app-web-client` directory):**

   ```bash
   npm run dev
   ```
   The application will run at **`http://localhost:5173/`**

## User Roles and Access Rights

This section outlines the user roles and their corresponding permissions in the Inventory App.

### User Roles:

1. Super Admin **(Role = 0)**
   - Can only manage users (create, update and delete user).

2. Office Staff **(Role = 1)**
   - Can manage transactions (create, read, update, delete).
   - Can manage goods (create, read, update, delete).
   - Can manage types (create, read, update, delete).
   - Can manage categories (create, read, update, delete).
   - Can manage units (create, read, update, delete).

3. Warehouse Staff **(Role = 2)**

   - Can only manage transaction details (add goods to a transaction).

## Superadmin Seeder

A seeder is provided to automatically create a superadmin. When running the seeder command, a superadmin user will be created with the following information:

- Email: `superadmin@gmail.com`
- Password: `superadmin123`

Use this information to log in as a superadmin after running the seeder.

## Additional Notes

Ensure that ports **5173** (frontend) and **5000** (backend) are not used by any other applications.
