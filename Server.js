const Express = require('express');
const userRoutes = require('./Routes/userRoutes');
const Mongoose = require('mongoose');
const Cors = require('cors');
const app = Express();

function initilizer() {
    corsCongif();
    parserCongif();
    dbCongif();
    routesConfig();
    error404Handler();
    globalErrorHandler();
}
initilizer();

function parserCongif() {
    app.use(Express.json())
}

function dbCongif() {
    const url = 'mongodb+srv://...@cluster0.nbwyw.mongodb.net/authcycle';
    Mongoose.connect(url).then(() => {
        console.log("DB Connected successfully");
    });
}

function routesConfig(){
    app.use('/auth/', userRoutes)
}

function corsCongif() {
    app.use(Cors())
}

function error404Handler() {
    app.use((req, res) => {
        res.status(404).json({
            message: 'Not Found',
            status_code: 404
        });
    })
}


function globalErrorHandler() {
    app.use((err, req, res, next) => {
        const errorStatus = req.errorStatus || 500;
        res.status(errorStatus).json({
            message: (Array.isArray(err)) ? err : ('message' in err ? err.message : 'Something Went Wrong. Please Try Again'),
            status_code: errorStatus
        })
    })
}


module.exports = app
