const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authors and Posts API',
            version: '1.0.0',
            description: 'REST API for managing authors and posts using Node.js, Express and PostgreSQL.'
        },
        serves: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;