"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_1 = require("../controller/user/user");
var book_1 = require("../controller/Book/book");
var Profile_1 = require("../controller/Profile/Profile");
var comment_1 = require("../controller/comment/comment");
var router = express_1["default"].Router();
//user
router.post('/api/users', user_1.Signup);
router.post('/api/auth', user_1.SignIn);
//books
router.post('/api/book', book_1.CreateBook);
router.post('/api/book', book_1.getBooks);
router.get('/api/book/:id', book_1.getBook);
router.patch('/api/book/:id', book_1.UpdateBook);
//profie
router.post('/api/profile', Profile_1.CreateProfile);
router.put('/api/profile/:id', Profile_1.UpdateProfile);
router["delete"]('/api/profile/:id', Profile_1.DeleteProfile);
//comment
router.post('/api/comment', comment_1.createComment);
router.put('/api/comment/:id', comment_1.EditComment);
router["delete"]('/api/comment/:id', comment_1.DeleteComment);
exports["default"] = router;
//# sourceMappingURL=index.js.map