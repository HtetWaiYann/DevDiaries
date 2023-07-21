import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Volunteer } from '../interfaces/volunteer';
import responseFunction from '../common/responseFunction';
import { IResponse } from '../interfaces/common';

@Service()
export default class AuthService {
    constructor(
        @Inject('volunteerModel') private volunteerModel: any,

    ) { }

    /**
     * Sign Up
     * @param Patient sign up user object
     * @returns
     */
    public async createVolunteer(IVolunteer: Volunteer): Promise<{ response: IResponse }> {
        try {

            const volunteerid = uuidv4();

            const volunteerData: Volunteer = {
                "volunteerid": volunteerid,
                "date": IVolunteer.date,
                "address": IVolunteer.address,
                "volunteer": IVolunteer.volunteer,
                "helist": IVolunteer.helist,
                "male": IVolunteer.male,
                "female": IVolunteer.female
            };


            var volunteerRecord: any;
            await this.volunteerModel.services.create(volunteerData).then((data: any) => {
                volunteerRecord = data;
            });

            if (!volunteerRecord) {
                throw new Error('Patient referal cannot be created');
            }

            const response: IResponse = responseFunction('200', 'Created successfully.', [volunteerRecord]);
            return { response };
        } catch (e) {
            throw e;
        }
    }

    public async getVolunteer(): Promise<Object> {

        try {
            var result: any;
            var response: IResponse;

            // Mysql function to delete dat{a
            await this.volunteerModel.services.findAll({}).then((data: any) => {
                if (data) {

                    const returncode = "200";
                    const message = "Vol List"

                    result = { returncode, message, data };

                    // console.log(response);
                    // return { response };
                } else {
                    const returncode = "300";
                    const message = "Vol list not found"
                    var data : any= [];
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

