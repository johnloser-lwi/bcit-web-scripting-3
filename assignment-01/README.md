# Book API
This project is a simple Book API built using Node.js and Express. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of books.

## Running the Project
``` bash
npm install
npx nodemon app.js
```
## Challenges
- Avoiding repeated id after deleting from database
  - A simulated database with json file
  - Read the json file and find the max id then add 1 to it for new book
  - Store new array to json file
- Error handling for invalid book information
  - Check if the book information is valid (e.g., title and author are not empty)