const express = require('express');
const pool = require('./db');
const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();

app.use(express.json());


app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

app.get('/', (req, res) => {
    res.json({ messages: 'API funcionando correctamente' });
});










module.exports = app;