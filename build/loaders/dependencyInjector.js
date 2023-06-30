"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_1 = __importDefault(require("./logger"));
const responseFunction_1 = __importDefault(require("../common/responseFunction"));
exports.default = ({ models }) => {
    try {
        models.forEach(m => {
            typedi_1.Container.set(m.name, m.model);
        });
        typedi_1.Container.set('logger', logger_1.default);
        typedi_1.Container.set('responseFunction', responseFunction_1.default);
        // LoggerInstance.info('✌️ Agenda injected into container');
        return {};
    }
    catch (e) {
        // LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
