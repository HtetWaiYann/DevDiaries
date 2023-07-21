"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
const responseFunction_1 = __importDefault(require("../common/responseFunction"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
exports.default = ({ app }) => {
    /**
     * Health Check endpoints
     * @TODO Explain why they are here
     */
    app.get('/', (req, res) => {
        res.json({ message: 'Server is running!' });
    });
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use((0, cors_1.default)());
    //Header override
    app.use(require('method-override')());
    // Transforms the raw string of req.body into json
    app.use(express_1.default.json());
    // Load Swagger 
    // let express to use this
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    // Load API routes
    app.use(config_1.default.api.prefix, (0, api_1.default)());
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send((0, responseFunction_1.default)('200', err.message, {})).end();
        }
        if (err.message === 'INVALID' || err.name === "INVALID") {
            return res.status(210).send((0, responseFunction_1.default)('401', err.message, {})).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json((0, responseFunction_1.default)('200', err.message, {}));
    });
};
