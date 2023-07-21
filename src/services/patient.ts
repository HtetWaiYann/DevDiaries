import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { IUser, IUserCredentialModel, IUserInputDTO, IUserModel } from '../interfaces/IUser';
import { v4 as uuidv4 } from 'uuid';
import { Patient } from '../interfaces/patient';
import responseFunction from '../common/responseFunction';
import { IResponse } from '../interfaces/common';

@Service()
export default class AuthService {
  constructor(
    @Inject('patientModel') private patientModel: any,

  ) { }

  /**
   * Sign Up
   * @param Patient sign up user object
   * @returns
   */
  public async createPatient(IPatient: Patient): Promise<{ response: IResponse }> {
    try {

      const patientid = uuidv4();

      const patientData: Patient = {
        "patientid": patientid,
        "name": IPatient.name,
        "sex": IPatient.sex,
        "age": IPatient.age,
        "referDate": IPatient.referDate,
        "township": IPatient.township,
        "address": IPatient.address,
        "referFrom": IPatient.referFrom,
        "referTo": IPatient.referTo,
        "signAndSymptom": IPatient.signAndSymptom
      };


      var patientRecord: any;
      await this.patientModel.services.create(patientData).then((data: any) => {
        patientRecord = data;
      });

      if (!patientRecord) {
        throw new Error('Patient referal cannot be created');
      }


      const response: IResponse = responseFunction('200', 'Created successfully.', [patientRecord]);
      return { response };
    } catch (e) {
      throw e;
    }
  }

  public async getPatients(): Promise<Object> {

    try {
      var result: any;
      var response: IResponse;

      // Mysql function to delete dat{a
      await this.patientModel.services.findAll({}).then((data: any) => {
        if (data) {
          console.log(">>>>>");
          console.log(data);
          const returncode = "200";
          const message = "Patient List"

          result = { returncode, message, data };

          // console.log(response);
          // return { response };
        } else {
          const returncode = "300";
          const message = "Patient list not found"
          var data: any = [];
          result = { returncode, message, data };
          // return { response };
        }
      });
      return result;
    } catch (e) {
      throw e;
    }

  }


}

