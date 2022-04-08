"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SignIn = exports.Signup = void 0;
var client_1 = require("@prisma/client");
var generateToken_1 = require("../../utils/generateToken");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user = new client_1.PrismaClient().user;
var Signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, password, hashedPassword, users, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, generateToken_1.getPassword)(password)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, user.create({
                        data: {
                            name: name,
                            email: email,
                            password: hashedPassword
                        },
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    })];
            case 3:
                users = _b.sent();
                res.status(201).json({ success: true, users: {
                        name: users.name,
                        email: users.email,
                        token: (0, generateToken_1.getToken)(id)
                    } });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(400).json({ message: "user already exists" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.Signup = Signup;
var SignIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, users, isMatch, payload, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user.findUnique({
                        where: {
                            email: email
                        }
                    })];
            case 2:
                users = _b.sent();
                if (!users) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: [{ msg: "User with this email is not found" }] })];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(password, users.password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: [{ msg: "Invalid password" }] })];
                }
                payload = {
                    users: {
                        id: users.id
                    }
                };
                jsonwebtoken_1["default"].sign(payload, process.env.JWT_KEY || '', { expiresIn: "7d" }, function (error, token) {
                    if (error)
                        throw error;
                    res.json({ token: token });
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                res.status(400).json({ message: "Server error" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.SignIn = SignIn;
//# sourceMappingURL=user.js.map