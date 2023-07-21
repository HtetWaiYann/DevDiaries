import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { Volunteer } from '../../interfaces/volunteer';
import middlewares from '../middlewares';
import volunteerService from '../../services/volunteer';

const route = Router();

export default (app: Router) => {
    app.use('/volunteers', route);

    route.post(
        '/add',
        middlewares.isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Reset Password endpoint with body: %o', req.body);
            try {
                const volunteerServiceInstance = Container.get(volunteerService);
                const result = await volunteerServiceInstance.createVolunteer(req.body as Volunteer);
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
                const volunteerServiceInstance = Container.get(volunteerService);
                const result = await volunteerServiceInstance.getVolunteer();

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
