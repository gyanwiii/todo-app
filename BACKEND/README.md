# To-do-list
 This is a To-do-list API Backend for the managment of tasks
 
# Routes and the Endpoints
### /todos
GET: Get all the to-do tasks in the system
POST: Create a new to-do task

### /todos/{id}
GET: Get a to-do task by its ID
PUT: Update a to-do task by its ID
DELETE: Delete a to-do task by its ID

### /todos/pending
GET: Get all pending tasks


## Commands:
npm init
npm i express
npm i cors
npm i nodemon --save-dev
npm run dev

To restore node modules and package.json ---> npm install or npm i

npm i mongoose
npm install mongodb

mongodb+srv://gyanwi17gupta_db_user:<db_password>@cluster0.44jysty.mongodb.net/?appName=Cluster0

npm i dotenv

## MVC Architecture
    >> M:Model(Structure of our MongoDb)
    >> V:View(Frontend)
    >> C:Controllers(Brain/Logic of a route)
