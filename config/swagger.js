const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'API documentation for the Library system',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local server',
        },
    ],

    components: {
        schemas: {
            ApiResponse: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: 'success',
                    },
                    message: {
                        type: 'string',
                        example: 'Success',
                    },
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                        },
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
