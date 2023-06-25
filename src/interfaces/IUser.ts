export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserInputDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface resetPwdInput {
  userid: string;
  password: string;
  newpassword: string;
}

export interface IUserCredentialModel {
  userid: string,
  email: string,
  password: string,
}

export interface IUserModel{
  userid: string,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  profile_image: string,
  bio: string,
}