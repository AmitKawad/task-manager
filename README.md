
# Task Manager



## Requirements
1. NodeJs
2. Typescript
3. MySql


## Descreption
The project exposes several APIs like the following. 
1. User can create a task with parameters like task name, priority, status, owner and date.
2. User can update the task using the update API
3. User can fetch a single task by name using a GET API
4. User can also fetch a list of tasks based on date filter with a GET list API.
5. User can fetch meterics of tasks grouped by dates. 


To Optimize the database operations, pagination has been implemented for the GET List APIs.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`user`

`password`

`database`


## Run the Project
To run this project, clone the project from this repo and install all the dependencies using the npm install command. This shall install all the dependencies from the package.json file.

Additionally install MySql database and create a database of your choice and provide it in the .env file as mentioned previously. Create a table with the schema for to store the task in the database

Example: CREATE TABLE Tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  priority INT
);

Run the project with the "npm start" script

Routes for all the APIs are present at routes/TaskRoute.ts file.

