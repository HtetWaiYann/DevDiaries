import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  //Sign up
  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { response } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
        return res.json(response).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  // Sign in
  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      // const logger:Logger = Container.get('logger');
      // logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { response } = await authServiceInstance.SignIn(email, password);
        return res.json(response).status(200);
      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );

  // Social Sign in
  route.post(
    '/social',
    celebrate({
      body: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { response } = await authServiceInstance.SocialSignIn(req.body as IUserInputDTO);
        return res.json(response).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
