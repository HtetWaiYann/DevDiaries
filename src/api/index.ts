import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import patient from './routes/patient';
import volunteer from './routes/volunteer';
import vot_patients from './routes/vot_patients';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	patient(app);
	vot_patients(app);
	volunteer(app);

	return app
}