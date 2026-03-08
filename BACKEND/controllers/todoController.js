// controllers/todoController.js    

import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        const newTodo = new Todo({ 
            todo ,
            completed: false,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error("CREATE TODO ERROR:", error); 
        res.status(500).json({ message: error.message });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { todo, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { todo, completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const toggleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
