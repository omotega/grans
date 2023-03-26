import winston = require('winston')

const options = {
    file:{
        level:'info',
        filename:'./src/logs/app.log',
        handleExceptions:true,
        json:true,
        maxSize:5242000,
        maxFile:5,
        colorize:false,
    },
    console:{
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true,
    },
}

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports:[
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    // emitOnError: false,
})


export default logger;

