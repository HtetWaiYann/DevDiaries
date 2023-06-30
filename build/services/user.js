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
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
let UserService = class UserService {
    constructor(userCredentialModel, logger) {
        this.userCredentialModel = userCredentialModel;
        this.logger = logger;
    }
    /**
     * Update password
     * @param resetPwdInput emial, password, newpassword
     * @returns
     */
    updatePassword(resetPwdInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var userRecord;
                // Mysql function to find data
                // before updating the password, we need to check user is registered or not
                yield this.userCredentialModel.services.findAll({ where: { userid: resetPwdInput.userid } }).then((data) => {
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
                const validPassword = bcrypt_1.default.compareSync(resetPwdInput.password, userRecord.password);
                if (validPassword) {
                    const salt = (0, crypto_1.randomBytes)(32);
                    this.logger.silly('Hashing password');
                    // const hashedPassword = await argon2.hash(resetPwdInput.newpassword);
                    const hashedPassword = bcrypt_1.default.hashSync(resetPwdInput.newpassword, 10);
                    const filter = { userid: resetPwdInput.userid };
                    const update = { password: hashedPassword };
                    try {
                        var result;
                        // Mysql function to update data
                        yield this.userCredentialModel.services
                            .update(update, {
                            where: filter,
                        })
                            .then((data) => {
                            if (data == 1) {
                                result = { message: 'Password updated successfully!' };
                            }
                            else {
                                throw new Error('Error updating the password.');
                            }
                        });
                        return result;
                    }
                    catch (e) {
                        this.logger.error(e);
                        throw e;
                    }
                }
                else {
                    throw new Error('Invalid Password');
                }
            }
            catch (e) {
                this.logger.error(e);
                throw e;
            }
        });
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('userCredentialModel')),
    __param(1, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.default = UserService;
