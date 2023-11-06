import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { IUser, IUserCredentialModel, IUserInputDTO, IUserModel } from '../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { VOTPatient, VOTStatus } from '../interfaces/vot_interface';
import responseFunction from '../common/responseFunction';
import { IResponse } from '../interfaces/common';

@Service()
export default class AuthService {
  constructor(
    @Inject('votpatientModel') private votpatientModel: any,
    @Inject('userCredentialModel') private userCredentialModel: any,
    @Inject('userModel') private userModel: any,
  ) {}

  /**
   * Sign Up
   * @param Patient sign up user object
   * @returns
   */
  public async createPatient(IVOTPatient: VOTPatient): Promise<{ response: IResponse }> {
    try {
      const votpatientid = uuidv4();
      const userid = uuidv4();

      const patientData: VOTPatient = {
        votpatientid: votpatientid,
        serialNo: IVOTPatient.serialNo,
        name: IVOTPatient.name,
        sex: IVOTPatient.sex,
        age: IVOTPatient.age,
        township: IVOTPatient.township,
        address: IVOTPatient.address,
        regdate: IVOTPatient.regdate,
        treatmentStartDate: IVOTPatient.treatmentStartDate,
        username: IVOTPatient.username,
        password: IVOTPatient.password,
        vot: IVOTPatient.vot,
        votstatus: '',
      };

      let result: { returncode: string; message: string; data: any };

      await this.votpatientModel.services.findOne({ where: { serialNo: IVOTPatient.serialNo } }).then((data: any) => {
        if (data) {
          console.log('>>>');
          console.log(data);
          throw new Error('Serial No Duplicate');
        }
      });
      // hash password for security
      const hashedPassword = bcrypt.hashSync(`${IVOTPatient.password}`, 10);
      console.log(hashedPassword);
      const userCredentialData: IUserCredentialModel = {
        userid: userid,
        username: IVOTPatient.username,
        email: 'test@test.com',
        password: hashedPassword,
      };

      const userData = {
        userid: userid,
        username: IVOTPatient.username,
        password: IVOTPatient.password,
      };

      var patientRecord: any;
      await this.votpatientModel.services.create(patientData).then((data: any) => {
        patientRecord = data;
      });
      var userRecord: any;
      await this.userModel.services.create(userCredentialData).then((data: any) => {
        userRecord = data;
      });

      var userCRecord: any;
      await this.userCredentialModel.services.create(userCredentialData).then((data: any) => {
        userRecord = data;
      });

      if (!patientRecord || !userRecord) {
        throw new Error('VOT Patient cannot be created');
      }

      const response: IResponse = responseFunction('200', 'Created successfully.', patientRecord);
      return { response };
    } catch (e) {
      throw e;
    }
  }

  public async getVOTPatients(): Promise<Object> {
    try {
      var result: any;
      var response: IResponse;

      // Mysql function to delete dat{a
      await this.votpatientModel.services.findAll({}).then((data: any) => {
        if (data) {
          console.log('>>>>>');
          console.log(data);
          const returncode = '200';
          const message = 'VOT Patient List';

          result = { returncode, message, data };

          // console.log(response);
          // return { response };
        } else {
          const returncode = '300';
          const message = 'VOT Patient list not found';
          var data: any;
          result = { returncode, message, data };
          // return { response };
        }
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  public async updateVOTStatus(votStatus: VOTStatus): Promise<Object> {
    try {
      var userRecord: any;
      // Mysql function to find data
      // before updating the password, we need to check user is registered or not
      await this.votpatientModel.services
        .findAll({ where: { votpatientid: votStatus.votpatientid } })
        .then((data: any) => {
          if (data.length > 0) {
            userRecord = data[0];
          }
        });

      if (!userRecord) {
        throw new Error('User not registered');
      }

      const filter = { votpatientid: votStatus.votpatientid };
      const update = { votstatus: votStatus };

      try {
        var result: any;
        // Mysql function to update data
        await this.votpatientModel.services
          .update(update, {
            where: filter,
          })
          .then((data: any) => {
            if (data == 1) {
              result = { message: 'Status updated successfully!' };
            } else {
              throw new Error('Error updating the status.');
            }
          });
        return result;
      } catch (e) {
        throw e;
      }
    } catch (e) {
      throw e;
    }
  }
}
