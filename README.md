This is my first MERN project that I have workes on both ends. It was a great experience. A lot to learn from here. To live this project I used 'Netlify' for frontend and 'Render' for backend.

## Functionallities: 
- Add todo
- Remove todo
- Update todo
- read todo
- can filter by active todos and done todos

### Check this project live on Netlify - 
https://todo-mern-app-project.netlify.app


# Some Tutorials from this project

## CURD with axios and RTK

### (1) Install axios 
```
npm install axios
```

### (2) Actions

```js

// post action
export const createTodo = createAsyncThunk("createTodo", async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/todos`, { data });
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
});

// get action
export const getTodo = createAsyncThunk("getTodo", async () => {
  try {
    const response = await axios.get(`${baseUrl}/todos`);
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error.message);
  }
});

// get single data action
export const updateTodoDone = createAsyncThunk("updateTodoDone", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/todos/${id}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
});

// update action
export const updateTodo = createAsyncThunk("updateTodo", async ([id, data]) => {
  try {
    const response = await axios.put(`${baseUrl}/todos/${id}`, { data });
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
});

// Delete action
export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/todos/${id}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
});

```



# Handle CORS (Cross-Origin Resource Sharing) issue

### (1) Install cors
```
npm i cors
```
### (2) Use in express execution file
```js
import cors from "cors";

app.use(cors())
```


# DOTENV
### (1) install dotenv
```
npm i dotenv
```

### (2) create file with name ".env"

### (3) '.env' file
```.env
DB_USERNAME=admin
DB_PASSWORD=12345678
```

### (4) file where you need the variable

```js
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
```


# Mongoose

### (1) install mongoose
```
npm i mongoose
```
### (2) Mongoose execution file
Location: server/database/db.js

```js
import mongoose from "mongoose";

const Connection = () => {
  const MONGODB_URL = `mongodb+srv://admin:naimur4030447@mern-todo.umea7bk.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("Database connected successfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.log(`Error while connecting! ${error.message}`);
  });
};

export default Connection;
```


### (3) invoke Connection function in express execution file 
Location: server/index.js

```js

import express from "express";
import Connection from "./database/db.js";
import cors from "cors";
import Routes from "./routes/routes.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", Routes); // if '/' is heated, Routes component will act

Connection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


```


### (4) Mongoose Schema file for data validation
Location: server/model/todoSchema.js

```js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model("todo", TodoSchema); // (CollectionName, schemaName)

export default Todo;

```

### (5) Create seperate routes.js component to manage routing
Location: server\routes\routes.js
```js
import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  toggleTodoDone,
  updateTodo,
} from "../todo-controller/todo-controller.js";

const route = express.Router();

route.post("/todos", createTodo);
route.get("/todos", getTodo);
route.get("/todos/:id", toggleTodoDone);
route.put("/todos/:id", updateTodo);
route.delete("/todos/:id", deleteTodo);

export default route;

```

### (6) Action file 
Location: server\todo-controller\todo-controller.js
```js
import Todo from "../model/TodoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      data: req.body.data,
      createdAt: Date.now(),
    });

    await newTodo.save();

    return res.status(200).json(newTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getTodo = async (req, res) => {
  try {
    const allTodos = await Todo.find({}).sort({ createdAt: -1 });

    return res.status(200).json(allTodos);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const toggleTodoDone = async (req, res) => {
  try {
    const todoRef = await Todo.findById(req.params.id);
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { done: !todoRef.done }
    );
    const updatedTodo = await Todo.findById(req.params.id);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { data: req.body.data }
    );
    const updatedTodo = await Todo.findById(req.params.id);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedTodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

```


