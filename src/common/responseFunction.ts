import { IResponse } from "../interfaces/common";

export default (returncode: string, message: string, data: object)=> {
  return { returncode: returncode, message: message, data: data };
};
