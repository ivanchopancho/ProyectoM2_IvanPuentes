const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authors and Posts API',
            version: '1.0.0',
            description: 'REST API for managing authors and posts using Node.js, Express and PostgreSQL.'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server'
            }
        ],
        components: {
            schemas: {
                Author: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        name: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'john@example.com'
                        },
                        bio: {
                            type: 'string',
                            example: 'Software developer'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },

                Post: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        author_id: {
                            type: 'integer',
                            example: 1
                        },
                        title: {
                            type: 'string',
                            example: 'My first post'
                        },
                        content: {
                            type: 'string',
                            example: 'This is the content of my post.'
                        },
                        published: {
                            type: 'boolean',
                            example: true
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time'
                        },
                        author_name: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        author_email: {
                            type: 'string',
                            format: 'email',
                            example: 'john@example.com'
                        }
                    }
                }
            }
        }

    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;