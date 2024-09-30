# nodeNetwork
This is a personal project, this contains registration, login auth and logout, this project is being made using react, mongodb, bcrypt and JWT, it also has a permission assigner via cli, I already created a route that it's still in development where it's able to select a user and modify their permissions if you have the rights to modify.

## Database connection
to connect the db to the project it's needed an account for MongoDB, insert you data to a .env file, consider also putting the port where the client will run: example

This project uses a frontend environment with Vite and a backend with Node.js and Express. Follow the steps to configure and run both environments locally.

## Clone the repository
Clone the repository from GitHub:
```
git clone https://github.com/joshmorenx/nodeNetwork.git
```

## Install the dependencies
Navigate to the project root folder and run the following command to install all necessary dependencies to run the project:
```
npm install
```

### Navigate to the server and client folders
To manage the dependencies of the frontend and backend, you need to move to their respective folders:

## Move to server folder and then install server dependencies
```
cd server
npm install
```

## Move to client folder and then install client dependencies
```
cd ../client
npm install
```

Create a MongoDB database
#### Note: You need to create a MongoDB database and obtain the database URL to connect it to the project.

Configuration of .env files
Two .env files need to be created, one for the client and another for the server.

.env file in the client folder:
``` .env
VITE_BACKEND="http://localhost:3000"
VITE_FRONTEND="http://localhost:5173"
```
.env file in the server folder:
``` .env
CLIENT_URL="http://localhost:5173"
EMAIL="email to be used as the sender"
MONGO_URL="a mongo database URL"
PASSWORD="an application email password"
PORT=3000
SECRET="secret phrase"
```

#### Note: The port may vary, but it is important that the frontend and backend are synchronized. In the case of deployment, make sure to add environment variables pointing to the actual servers instead of localhost.

Deployment Configuration
When deploying the application, keep in mind the following:
Update the environment variables to point to the actual URLs of your frontend and backend servers.
In the index.js file of the server, add the URL of your frontend to the allowedHosts list to enable it to consume the APIs.
For deployment, it is recommended to use Vercel for the frontend and Render for the backend.

# Running the project
After the completion of all steps must move to the root folder, before ./server and ./client folders

```
cd ..
npm start
```

then visit the Url to see it in action.
