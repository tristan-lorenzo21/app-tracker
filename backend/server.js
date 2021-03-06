require('dotenv').config({path: "debug./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require("./middleware/error");

// Connect DB
connectDB();

const app = express();

app.use(express.json());

// whenever a request comes in, this piece of middleware catches it and checks if its api/auth/... 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
app.use('/api/applications', require('./routes/applications'));

// Error Handler (should be the last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})