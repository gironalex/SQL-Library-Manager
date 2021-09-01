## SQL Library-Manager
 # Description
 This app uses a combination of Express, Sequelize, and Pug to manage a list of library books. User will be able to Create, Add, Edit and Delete existing books.

 # Technologies Used
  Javascript
  Express
  Sequelize
  Pug

 # How to interact with the app?
  Download project files
  Run npm install to acquire dependencies
  Use npm start to start the server and connect to database
  Navigate to localhost:3000 in browser

# How the app works? 
  Newly created books added to bottom of list
  When creating/updating a book, the Author and Title inputs must be present in order for POST to complete.
  Submissions without required content will render an error
  Error handlers will ensure user can "travel" to existing pages only
  Deleting a book permanantely removes the file from the database 
