"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const responseFunction_1 = __importDefault(require("../common/responseFunction"));
let AuthService = class AuthService {
    constructor(userCredentialModel, userModel, logger) {
        this.userCredentialModel = userCredentialModel;
        this.userModel = userModel;
        this.logger = logger;
    }
    /**
     * Sign Up
     * @param userInputDTO sign up user object
     * @returns
     */
    SignUp(userInputDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var checkUserRecord;
                // check user with same email already exists
                yield this.userCredentialModel.services.findOne({ where: { email: userInputDTO.email } }).then((data) => {
                    checkUserRecord = data;
                });
                if (checkUserRecord) {
                    throw new Error('User already exists.');
                }
                // create primary key with uuid() and hash password with bcrypt
                const userid = (0, uuid_1.v4)();
                // hash password for security
                const hashedPassword = bcrypt_1.default.hashSync(userInputDTO.password, 10);
                console.log(hashedPassword);
                const userCredentialData = {
                    userid: userid,
                    email: userInputDTO.email,
                    password: hashedPassword,
                };
                const userData = {
                    userid: userid,
                    firstname: userInputDTO.firstname,
                    lastname: userInputDTO.lastname,
                    username: '',
                    email: userInputDTO.email,
                    profile_image: '',
                    bio: '',
                };
                // put user record into user table
                var userCredentialRecord;
                var userRecord;
                yield this.userCredentialModel.services.create(userCredentialData).then((data) => {
                    userCredentialRecord = data;
                });
                // Check query transaction is success
                if (!userCredentialRecord) {
                    throw new Error('User cannot be created');
                }
                yield this.userModel.services.create(userData).then((data) => {
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
                const response = (0, responseFunction_1.default)('200', 'Signed up successfully.', user);
                return { response };
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Sign In
     * @param email Email
     * @param password Password
     * @returns
     */
    SignIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var userRecord;
            yield this.userCredentialModel.services.findAll({ where: { email: email } }).then((data) => {
                if (data.length > 0) {
                    userRecord = data[0];
                }
            });
            if (!userRecord) {
                throw new Error('INVALID');
            }
            const validPassword = bcrypt_1.default.compareSync(password, userRecord.password);
            if (validPassword) {
                const token = this.generateToken(userRecord.userid);
                // const user = userRecord;
                // Reflect.deleteProperty(user, 'password');
                const data = {
                    token: token,
                    userid: userRecord.userid,
                };
                const response = (0, responseFunction_1.default)('200', 'Signed in successfully.', data);
                return { response };
            }
            else {
                throw new Error('INVALID');
            }
        });
    }
    /**
     * Social Media Sign In (google, facebook, github)
     * @param userInputDTO sign up user object
     * @returns IResponse
     */
    SocialSignIn(userInputDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var checkUserRecord;
                // check user with same email already exists
                yield this.userCredentialModel.services.findAll({ where: { email: userInputDTO.email } }).then((data) => {
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
                    const response = (0, responseFunction_1.default)('200', 'Signed in successfully.', _data);
                    return { response };
                }
                // create primary key with uuid() and hash password with bcrypt
                const userid = (0, uuid_1.v4)();
                // password will not include if the api comes from social sign in such as google
                const userCredentialData = {
                    userid: userid,
                    email: userInputDTO.email,
                    password: '',
                };
                const userData = {
                    userid: userid,
                    firstname: userInputDTO.firstname,
                    lastname: userInputDTO.lastname,
                    username: '',
                    email: userInputDTO.email,
                    profile_image: '',
                    bio: '',
                };
                // put user record into user table
                var userCredentialRecord;
                var userRecord;
                yield this.userCredentialModel.services.create(userCredentialData).then((data) => {
                    userCredentialRecord = data;
                });
                // Check query transaction is success
                if (!userCredentialRecord) {
                    throw new Error('User cannot be created');
                }
                yield this.userModel.services.create(userData).then((data) => {
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
                const response = (0, responseFunction_1.default)('200', 'Signed up successfully.', user);
                return { response };
            }
            catch (e) {
                throw e;
            }
        });
    }
    /**
     * Generate jwt token
     * @param userid userid to store in jwt token payload
     * @returns
     */
    generateToken(userid) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        // this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jsonwebtoken_1.default.sign({
            userid: userid,
            exp: exp.getTime() / 1000,
        }, config_1.default.jwtSecret);
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('userCredentialModel')),
    __param(1, (0, typedi_1.Inject)('userModel')),
    __param(2, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthService);
exports.default = AuthService;
