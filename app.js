require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const apiRouter = require('./routes/api.routes');

app.use(bodyParser.json());
app.use('/api', apiRouter);

const swaggerOption = {
    swaggerDefinition: {
        info: {
            title: 'ToDo-list API',
            description: 'This is server for app ToDo-list',
            contact: {
                name: 'Ihar Mesko',
                email: 'igor1mesko@gmail.com',
            },
            server: ['http://localhost:3000'],
            version: '1.0.0',
        },
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDoc = swaggerJsDocs(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to DB!'));

app.listen(process.env.PORT, '0.0.0.0');

//for testing
module.exports = app;
