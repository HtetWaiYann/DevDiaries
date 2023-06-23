import { Service, Inject } from 'typedi';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { resetPwdInput } from '../interfaces/IUser';

@Service()
export default class UserService {
  constructor(@Inject('userModel') private userModel: any, @Inject('logger') private logger: any) {}

  public async updatePassword(resetPwdInput: resetPwdInput): Promise<object> {
    try {
      var userRecord: any;
      // Mysql function to find data
      // before updating the password, we need to check user is registered or not
      await this.userModel.services.findAll({ where: { email: resetPwdInput.email } }).then((data: any) => {
        if (data.length > 0) {
          userRecord = data[0];
        }
      });

      if (!userRecord) {
        throw new Error('User not registered');
      }
      /**
       * We use verify from argon2 to prevent 'timing based' attacks
       */
      this.logger.silly('Checking password');
      // const validPassword = await argon2.verify(userRecord.password, resetPwdInput.password);
      const validPassword = bcrypt.compareSync(resetPwdInput.password, userRecord.password);
      if (validPassword) {
        const salt = randomBytes(32);
        this.logger.silly('Hashing password');
        // const hashedPassword = await argon2.hash(resetPwdInput.newpassword);
        const hashedPassword = bcrypt.hashSync(resetPwdInput.newpassword, 10);
        const filter = { email: resetPwdInput.email };
        const update = { password: hashedPassword };
        try {
          var result: any;
          // Mysql function to update data
          await this.userModel.services
            .update(update, {
              where: filter,
            })
            .then((data: any) => {
              if (data == 1) {
                result = { message: 'Password updated successfully!' };
              } else {
                throw new Error('Error updating the password.');
              }
            });
          return result;
        } catch (e) {
          this.logger.error(e);
          throw e;
        }
      } else {
        throw new Error('Invalid Password');
      }
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

}
