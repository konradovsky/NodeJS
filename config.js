// Config fot enviroments

// Enviroments container
let enviroments = {};

// Development enviroment
enviroments.development = {
    'port' : 3000,
    'envName' : 'development'
}

// Production enviroment
enviroments.production = {
    'port' : 5000,
    'envName' : 'production'
}

// Determine which enviroment was passed as a command-line argument
let currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if the curren env is one of the env above, if not, default is dev
let enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.development;

// Export the module
module.exports = enviromentToExport;