# TaskApp
Link to application demo : https://limitless-retreat-38637.herokuapp.com/

The Task Application, is a utility application that I am developing to help developers manage their tasks and projects in a very simple way.

To run it locally:

1. cd into the TaskApp folder
2. type `npm install` to install all the dependencies for the application
3. you need to get your mongodb atlas account to hookup the database
4. in the model folder the is a user schema and a task schema
5. when you create your db on mongodb atlas make sure the collection names are tasks and users for the db to hookup correctly
6. once that is done get your `db uri`
7. cd into the server folder and locate the server.js file
8. In it you need to look for the `db uri` replace the placeholder value with your db uri from mongodb atlas
9. Afterwards type `npm start`
10. move to your browser, it should load the localhost automatically
11. view the application

#Features
Currently you can just create a task, edit and delete it. also there is authentication as well
What I want to add is:
1. A way to share tasks with colleagues, like a group functionality
2. A chat feature, which is already a separate appliction I have built
more features to come as i brainstorm

#Downsides
Though you can only access the dashboard when you create an account, because the data is fetched from the same task collection
when you create a task when another person signs up they get to see what you have created.
Am learning how to make it a single user view , that way each user would have their own collection.
