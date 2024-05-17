!CAUTION THIS REPO IS UNDER DEVELOPMENT 
# nodeNetwork
This is a personal project, this contains basic registration, login, logout being authenticated by using react, mongodb, bcrypt and jsonwebtoken, it also has a permission assigner via cli, I already created a route that it's still in development where it's able to select a user and modify their permissions if you have the rights to modify.

to connect the db to the project it's needed an account for MongoDB, insert you data to a .env file, consider also putting the port where the client will run: example

CONFIG YOUR FILES 
.env:

MONGO_URL="YOUR MONGO CONNECTION"
PORT=3000
SECRET="WHATEVER YOU WANT TO BE YOUR PASSPHRASE"

...........................

OPEN A NEW TERMINAL INTO AND RUN
>\nodeNetwork\client\> npm install

#start the client

>\nodeNetwork\client\> npm run dev

###############################

>\nodeNetwork\server\> npm install

#start the server

>\nodeNetwork\client\> npm start

###############################

open a new terminal and run the folloing string to see the changes in the frontend
>\nodeNetwork\client> npx tailwindcss -i .\src\assets\input.css -o .\src\assets\output.css --watch

