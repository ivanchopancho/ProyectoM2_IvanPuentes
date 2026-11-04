const express = require('express');
const pool = require('./db');
const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);

app.get('/', (req, res) => {
    res.json({ messages: 'API funcionando correctamente' });
});










module.exports = app;