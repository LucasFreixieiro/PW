const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'PW API FORUM',
      version: '1.0.0',
    },
    basePath: '/',
  };
  
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};
  
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;