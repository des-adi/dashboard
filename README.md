#Dashboard

#Description

This web dashboard is set up to manage users' data which is stored locally on a postgres database.

#Features

1]. Add a new user
2]. View existing users
3]. Update a user's description or delete a user from the records

#Installation

1]. Install a vite + react app on your computer by using the following command

npm create vite@latest my-react-app --template react

2]. Update the template vite+react app by adding all the .jsx files and css files into a new components folder in the src folder.
3]. Add the server.js and index.html files into the app.
4]. Install all the npm packages. Go into the project folder and type the following command to install all npm packages
bash

npm install

You may need to install react-router-dom, cors, express, pg and body-parser packages seperately.



#Application design

This application is a React-app with the data handling managed by a postgres database at the backend. The frontend framework is managed by react while expressjs and nodejs handle the api requests at the backend in server.js file.

The postgres table "users" is created in the database "react-app" by running the following command

create table users(
	id SERIAL primary key,
	username char(20) NOT NULL UNIQUE ,
	dob DATE NOT NULL UNIQUE,
	contact varchar(10) NOT NULL UNIQUE,
	email varchar(30) NOT NULL UNIQUE,
	description varchar(100) NOT NULL
);





