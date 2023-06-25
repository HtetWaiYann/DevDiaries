import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { resetPwdInput } from '../../interfaces/IUser';
import middlewares from '../middlewares';
import UserService from '../../services/user';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  //Update Password
  route.post(
    '/profile/update',
    celebrate({
      body: Joi.object({
        userid: Joi.string().required(),
        password: Joi.string().required(),
        newpassword: Joi.string().required(),
      }),
    }),
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Reset Password endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(UserService);
        const result = await authServiceInstance.updatePassword(req.body as resetPwdInput);
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  //Update Password
  route.post(
    '/password/update',
    celebrate({
      body: Joi.object({
        userid: Joi.string().required(),
        password: Joi.string().required(),
        newpassword: Joi.string().required(),
      }),
    }),
    middlewares.isAuth,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Reset Password endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(UserService);
        const result = await authServiceInstance.updatePassword(req.body as resetPwdInput);
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
