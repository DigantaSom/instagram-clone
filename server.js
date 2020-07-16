const express = require('express');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
// const cors = require('cors');

const app = express();

connectDB();

// app.use(cors());
app.use(express.json());
app.use(fileupload());

// Handling CORS -->
// give api access to a origin. * represents any origin.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // if we restrict api access to only one site (in place of *), with tools like Postman, it can be accessed. <- not a secure feature.
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X_Requested-With, Content-Type, Accept, Authorization'
    );
    // browser will always send an options request when you send a POST/PUT request.
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
