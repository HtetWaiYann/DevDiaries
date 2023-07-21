import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { Patient } from '../../interfaces/patient';
import middlewares from '../middlewares';
import PatientService from '../../services/patient';

const route = Router();

export default (app: Router) => {
    app.use('/patients', route);

    route.post(
        '/add',
        middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const patientServiceInstance = Container.get(PatientService);
                const result = await patientServiceInstance.createPatient(req.body as Patient);
                return res.status(201).json(result.response);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.post(
        '/get',
        middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const patientServiceInstance = Container.get(PatientService);
                const result = await patientServiceInstance.getPatients();

                console.log("-------");

                console.log(result);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

};
