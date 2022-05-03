# SaaS-Team1

To execute the server db and then the node server with the following commands:

//create the db file directory

step 0: md db


//Starts the DB server on port 3000

step 1: start.recipeWebsite.cmd


//populate the DB server with sample data 

step 2: startdbClient.recipeWebsite2.cmd

load ('createDB/createRecipesData.js');

load ('createDB/createAdminUser.js'); 

exit


//make sure install npm packages 

step 3: npm install


//Compile Node/Express Server. You may need to go to all subdirectories and compile the ts files. 

step 4: tsc AppServer.ts


//Execute Node/Express server on port 8080 

step 5: node AppServer.js
