const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Health Food Tracker API',
        description: 'API documentation for Health and Food Tracker',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);