# Users Crud

## What is it ?

This is a app to show Docker + MySQL + Express.js integration, using mysql2 npm package, if you want to see more about the dependencies look into package.json.

This app is a simple CRUD (Create, Read, Update, Delete) system with a list of users that you can update, change his name, and also change his profile.

There is no Render proccess and efford into the application front-end (And I don't plan to), because the porpouse is the back-end focus and look into MVC and Database integration.

## How to use it

If you want to test the application in your machine, you will need to make some changes in the files, first of all will be in .env

### .ENV FILE

You should change everything about the DB Info, and save what are your information because you will be using it at docker-compose file

### DOCKER-COMPOSE.YML

This file is inside the "sql-server" folder (Rembember, before thinking about the docker files you should have docker started in your computer in order to start sql server, or, if you don't want to use docker you can just start a SQL Server in your localhost it will do the same), inside docker file change "enviroment" and "volumes", you can also change the port you are exposing in "ports"

Remember, "volumes" will take as first parameter the folder i'm currently pulling from docker mysql, and the second parameter is where it is located at docker container.

### NPM INSTALL

You should not forget about "npm i" at the folder's path, otherwise you will not have the dependencies installed.

### CREATING THE DB TABLE

Before starting the application, you should first run the SQL Server and after that, run the DDL SQL located ate "sql-server/schema.sql", make sure you created all tables in your database, otherwise it will not run properly.

OBS: There are some placeholders scripts inside this file that you may want to run.

## Why using this app

This app is not only for showing this integration but it can also help you when you want to use Express.js + MySQL integration, because there are some models done for you to put in your app.

### db.js

If you take a look into db.js it shows a "sqlQuery" function that is already made for preventing SQL Injection with objects header, it is very simple but some people forgets to prevent it. Also as it takes params args with array in SQL and not String concatenation it is prevented for SQL commands injection in forms.

### models

You should take a look into first the models folder, after it, routes folder and finally controllers folder, you will see a model to work with MySQL in Node.js.

### model date parser

There is a model date parser, when you use the DATETIME from SQL it will give you in the SQL format, but using the library "moment" we can format it as we see in the User model.