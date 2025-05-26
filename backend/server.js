// src/server.js

const express = require('express');
const cors=require('cors');
const app = express();
const bookRoutes=require('./routes/book');

app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes); // 👈 Use the route

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
