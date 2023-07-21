"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const middlewares_1 = __importDefault(require("../middlewares"));
const volunteer_1 = __importDefault(require("../../services/volunteer"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/volunteers', route);
    route.post('/add', middlewares_1.default.isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Reset Password endpoint with body: %o', req.body);
        try {
            const volunteerServiceInstance = typedi_1.Container.get(volunteer_1.default);
            const result = yield volunteerServiceInstance.createVolunteer(req.body);
            return res.status(201).json(result.response);
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    }));
    route.post('/get', middlewares_1.default.isAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const logger = typedi_1.Container.get('logger');
        logger.debug('Calling Reset Password endpoint with body: %o', req.body);
        try {
            const volunteerServiceInstance = typedi_1.Container.get(volunteer_1.default);
            const result = yield volunteerServiceInstance.getVolunteer();
            console.log("-------");
            console.log(result);
            return res.status(200).json(result);
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    }));
};
