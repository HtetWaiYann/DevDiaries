import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { IUser, IUserCredentialModel, IUserInputDTO, IUserModel } from '../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { IResponse } from '../interfaces/common';
import responseFunction from '../common/responseFunction';

@Service()
export default class AuthService {
  constructor(
    @Inject('userCredentialModel') private userCredentialModel: any,
    @Inject('userModel') private userModel: any,
    @Inject('logger') private logger: any,
  ) {}

  /**
   * Sign Up
   * @param userInputDTO sign up user object
   * @returns
   */
  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ response: IResponse }> {
    try {
      var checkUserRecord;
      // check user with same email already exists
      await this.userCredentialModel.services.findOne({ where: { email: userInputDTO.email } }).then((data: any) => {
        checkUserRecord = data;
      });

      if (checkUserRecord) {
        throw new Error('User already exists.');
      }

      // create primary key with uuid() and hash password with bcrypt
      const userid = uuidv4();
      // hash password for security
      const hashedPassword = bcrypt.hashSync(userInputDTO.password, 10);
      console.log(hashedPassword);
      const userCredentialData: IUserCredentialModel = {
        userid: userid,
        email: userInputDTO.email,
        password: hashedPassword,
      };

      const userData: IUserModel = {
        userid: userid,
        firstname: userInputDTO.firstname,
        lastname: userInputDTO.lastname,
        username: '',
        email: userInputDTO.email,
        profile_image: '',
        bio: '',
      };

      // put user record into user table
      var userCredentialRecord: any;
      var userRecord: any;
      await this.userCredentialModel.services.create(userCredentialData).then((data: any) => {
        userCredentialRecord = data;
      });

      // Check query transaction is success
      if (!userCredentialRecord) {
        throw new Error('User cannot be created');
      }

      await this.userModel.services.create(userData).then((data: any) => {
        userRecord = data;
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      this.logger.info(JSON.stringify(userCredentialRecord));
      const token = this.generateToken(userid);
      const user = { token: token, userid: userid };

      // remove the password field from the object
      Reflect.deleteProperty(user, 'password');

      const response: IResponse = responseFunction('200', 'Signed up successfully.', user);
      return { response };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Sign In
   * @param email Email
   * @param password Password
   * @returns
   */
  public async SignIn(email: string, password: string): Promise<{ response: IResponse }> {
    var userRecord: any;
    await this.userCredentialModel.services.findAll({ where: { email: email } }).then((data: any) => {
      if (data.length > 0) {
        userRecord = data[0];
      }
    });
    if (!userRecord) {
      throw new Error('INVALID');
    }

    const validPassword = bcrypt.compareSync(password, userRecord.password);
    if (validPassword) {
      const token = this.generateToken(userRecord.userid);
      // const user = userRecord;
      // Reflect.deleteProperty(user, 'password');
      const data = {
        token: token,
        userid: userRecord.userid,
      };
      const response: IResponse = responseFunction('200', 'Signed in successfully.', data);
      return { response };
    } else {
      throw new Error('INVALID');
    }
  }

  /**
   * Social Media Sign In (google, facebook, github)
   * @param userInputDTO sign up user object
   * @returns IResponse
   */
  public async SocialSignIn(userInputDTO: IUserInputDTO): Promise<{ response: IResponse }> {
    try {
      var checkUserRecord: any;
      // check user with same email already exists
      await this.userCredentialModel.services.findAll({ where: { email: userInputDTO.email } }).then((data: any) => {
        if (data.length > 0) {
          checkUserRecord = data[0];
        }
      });

      if (checkUserRecord) {
        const token = this.generateToken(checkUserRecord.userid);
        const _data = {
          token: token,
          userid: checkUserRecord.userid,
        };
        const response: IResponse = responseFunction('200', 'Signed in successfully.', _data);
        return { response };
      }

      // create primary key with uuid() and hash password with bcrypt
      const userid = uuidv4();
      // password will not include if the api comes from social sign in such as google
      const userCredentialData: IUserCredentialModel = {
        userid: userid,
        email: userInputDTO.email,
        password: '',
      };

      const userData: IUserModel = {
        userid: userid,
        firstname: userInputDTO.firstname,
        lastname: userInputDTO.lastname,
        username: '',
        email: userInputDTO.email,
        profile_image: '',
        bio: '',
      };

      // put user record into user table
      var userCredentialRecord: any;
      var userRecord: any;
      await this.userCredentialModel.services.create(userCredentialData).then((data: any) => {
        userCredentialRecord = data;
      });

      // Check query transaction is success
      if (!userCredentialRecord) {
        throw new Error('User cannot be created');
      }

      await this.userModel.services.create(userData).then((data: any) => {
        userRecord = data;
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      this.logger.info(JSON.stringify(userCredentialRecord));
      const token = this.generateToken(userid);
      const user = { token: token, userid: userid };

      // remove the password field from the object
      Reflect.deleteProperty(user, 'password');

      const response: IResponse = responseFunction('200', 'Signed up successfully.', user);
      return { response };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Generate jwt token
   * @param userid userid to store in jwt token payload
   * @returns
   */
  public generateToken(userid: string) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    // this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        userid: userid,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret!,
    );
  }
}
