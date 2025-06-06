const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', require('./routes/books')); // Adjust path to your books.js file

app.listen(3001, () => console.log('Server running on port 3001'));