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
const uuid_1 = require("uuid");
const responseFunction_1 = __importDefault(require("../common/responseFunction"));
let AuthService = class AuthService {
    constructor(volunteerModel) {
        this.volunteerModel = volunteerModel;
    }
    /**
     * Sign Up
     * @param Patient sign up user object
     * @returns
     */
    createVolunteer(IVolunteer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const volunteerid = (0, uuid_1.v4)();
                const volunteerData = {
                    "volunteerid": volunteerid,
                    "date": IVolunteer.date,
                    "address": IVolunteer.address,
                    "volunteer": IVolunteer.volunteer,
                    "helist": IVolunteer.helist,
                    "male": IVolunteer.male,
                    "female": IVolunteer.female
                };
                var volunteerRecord;
                yield this.volunteerModel.services.create(volunteerData).then((data) => {
                    volunteerRecord = data;
                });
                if (!volunteerRecord) {
                    throw new Error('Patient referal cannot be created');
                }
                const response = (0, responseFunction_1.default)('200', 'Created successfully.', [volunteerRecord]);
                return { response };
            }
            catch (e) {
                throw e;
            }
        });
    }
    getVolunteer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result;
                var response;
                // Mysql function to delete dat{a
                yield this.volunteerModel.services.findAll({}).then((data) => {
                    if (data) {
                        const returncode = "200";
                        const message = "Vol List";
                        result = { returncode, message, data };
                        // console.log(response);
                        // return { response };
                    }
                    else {
                        const returncode = "300";
                        const message = "Vol list not found";
                        var data = [];
                        result = { returncode, message, data };
                        // return { response };
                    }
                });
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('volunteerModel')),
    __metadata("design:paramtypes", [Object])
], AuthService);
exports.default = AuthService;
