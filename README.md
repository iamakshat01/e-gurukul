# [E-Gurukul 🔗](https://www.e-gurukul.netlify.app/)


# Project Description

E-gurukul is a online learning management portal for students and educational institutions.


# Features Implemented

   - Admin - Create Batches, Add Faculty and Students 
   - Faculty - Create Classrooms, Add Meet Links, Create Posts and Assignments
   - Students - View Classrooms, Meet links and Submit Assignments

 
# Technologies Used

## 1. Frontend

1. React
2. Material-UI

## 2. Backend

1. Node.js
2. Express
3. MongoDB

# Local Setup

Clone the frontend and backend repositories, cd into them individually, and then follow the below mentioned steps for setting up backend and frontend seprately.

## 1. Frontend

1. Run `npm install`.
2. Do `npm start `. By default the backend is setup to run on port 3000.

## 2. Backend

1. Run `npm install`.
2. Edit config file in bin folder with following details for JWT secret, Database Link and Port
	- SECRET=' '
	- DATABASE = ' '
	- PORT = ' '
3. Run `npm start` in the Backend repo first and then in Frontend .
