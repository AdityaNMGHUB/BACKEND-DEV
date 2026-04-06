const connectDB = require('./db');
const mongoose = require('mongoose');
const Todo = require('./todoModel');
const addTodo = require('./addTodo');
const getAllTodos = require('./getAllTodos');
const updateTodo = require('./updateTodo');
const markAsCompleted = require('./markAsCompleted');
const deleteTodo = require('./deleteTodo');

const runDemo = async () => {
    // Connect to MongoDB
    await connectDB();
    
    // Clear the collection before running the demo to avoid duplicate ID errors on reruns
    await Todo.deleteMany({});

    console.log("STARTING MODULAR TODO APP DEMO WITH MONGODB\n");

    // 1. Adding Todos
    console.log("--- Executing: addTodo ---");
    await addTodo(1, "Learn Node.js Modules", "Understand require and module.exports.");
    await addTodo(2, "Build Split File App", "Separate CRUD application into multiple JS files.");
    await addTodo(3, "Test App", "Run the application through index.js.");

    // Edge Cases for Add
    await addTodo(3, "Duplicate Test", "Testing duplicate ID handling."); // Should fail due to duplicate ID

    // 2. Display Todos
    console.log("\n--- Executing: getAllTodos ---");
    await getAllTodos();

    // 3. Update Todo
    console.log("--- Executing: updateTodo ---");
    await updateTodo(1, "Master Node.js Modules", "Deep dive into advanced Node.js and CommonJS modules.");

    // Edge Case for Update
    await updateTodo(99, "Non-existent Todo", "Should fail properly"); // Should fail properly

    // 4. Mark as Completed
    console.log("\n--- Executing: markAsCompleted ---");
    await markAsCompleted(2);

    // Edge Case for Mark as Completed
    await markAsCompleted(88); // Should fail properly

    console.log("\n--- Display Todos After Updates & Completion ---");
    await getAllTodos();

    // 5. Delete Todo
    console.log("--- Executing: deleteTodo ---");
    await deleteTodo(3);

    // Edge Cases for Delete
    await deleteTodo(77); // Should fail properly

    // Display final list
    console.log("\n🎉 FINAL TODOS LIST 🎉");
    await getAllTodos();

    console.log("\nClosing Database Connection...");
    await mongoose.connection.close();
};

runDemo();
