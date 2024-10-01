# nodeNetwork
This is an open-source social network built using the MERN stack (MongoDB, Express, React, Node.js). It includes core features such as user registration, login, and logout. Users can interact through a dynamic feed to share content, explore user profiles, and manage a following system to stay updated with others. The platform also offers a personal gallery for images, a post search bar for easy content discovery, an admin dashboard for managing user permissions, and a secure password recovery system. Notably, the first registered user will always have admin privileges, regardless of explicit permissions. Additionally, the platform includes a robust system for liking and disliking both posts and comments, along with real-time notifications. Users are notified instantly when others interact with their posts or comments (e.g., through likes or dislikes), ensuring they stay engaged with their content.

# First things first
##### This project uses a frontend environment with Vite, and a backend with Node.js and Express. Follow the steps to configure and run both environments locally.

## Clone this repo
Start a new terminal, clone it and wait for it to finish the clone process
```bash
git clone https://github.com/joshmorenx/nodeNetwork.git
```

Then navigate to the cloned repo
```bash
cd ./nodeNetwork/
```

## Install the dependencies

In the main folder "./nodeNetwork/", run the following command to install all necessary dependencies to run the project:
```bash
npm install
```

Navigate to server folder and then install server dependencies.
```bash
cd server
npm install
```

Now, go back to the root folder and navigate to client folder and then, install client dependencies.
```bash
cd ../client
npm install
```

## Database connection

To connect the new database to the project, it's needed an account for MongoDB Atlas, after creating the account start a new database, after the database is created MongoDB will provide a connection Url, it will look like this example:
```
"mongodb+srv://username:password@cluster0.abcde.mongodb.net/databaseName?retryWrites=true&w=majority"
```
#### Note: this url will be used in a little.

## Configuration of the .env files

Two .env files needs to be created, one for the client and another for the server.

#### .env file in the client folder:
```.env
VITE_BACKEND="http://localhost:3000"
VITE_FRONTEND="http://localhost:5173"
```

#### .env file in the server folder (Here we will be using the MongoDB given url):
```.env
CLIENT_URL="http://localhost:5173"
EMAIL="example@domainprovider.com"
MONGO_URL="mongodb+srv://username:password@cluster0.abcde.mongodb.net/databaseName?retryWrites=true&w=majority"
PASSWORD="Application_p455w0rd"
PORT=3000
SECRET="SeCr3T_Phr4s3"
```
#### Note: Make sure that the "EMAIL" variable in the .env file from the server side is able to send emails.
#### Note: The port can be modified, but it is important that the frontend and backend are synchronized in the case of deployment, make sure to add environment variables pointing to the actual servers instead of localhost.

# Running the project locally
After the completion of all steps must move to the root folder, before ./server and ./client folders

```
cd ..
npm start
```
then visit the Url given by Vite to see it in action.

## Deployment Configuration
When deploying the application, make sure the following:
Update the environment variables to point to the actual URLs of your frontend and backend servers given from the actual providers.
In the index.js file of the server side, add the URL of your frontend to the allowedOrigins array to allow the CORS frontend to consume the APIs, for example:

#### Frontend EXAMPLE Url given by Vercel: https://node-network-chi.vercel.app
```JavaScript
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:5173',
    'https://node-network-chi.vercel.app'
];
```

For deployment, it's recommended to use Vercel for the frontend and Render for the backend.


