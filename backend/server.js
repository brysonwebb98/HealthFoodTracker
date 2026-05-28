const express = require('express');
const mongodb = require('./DB/connection');
const app = express();
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.get('/', (req, res) => {
    res.send('Health Food Tracker API is running!');
});

// 500 ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: 'Internal Server Error'
    });
});

// 404 ERROR HANDLING
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    }
});

