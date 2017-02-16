var express = require('express');
var router = express.Router();

models = require("../models");

/**
 * @apiDefine InternalError Internal Server Error 500
 * An error occurs inside the server that is not the fault of the request
 *
 * @apiError (InternalError) {String} error The error that occured
 * @apiError (InternalError) {Number} code The code of the http error
 * @apiErrorExample Internal Server Error
 * {
 *   "error": "Internal Server Error"
 *   "code": 500
 * }
 */

router.use(  '/food', require('./food')   );
router.use('/course', require('./course') );
router.use(  '/week', require('./week')   );

router.use(  '/user', require('./user')   );

module.exports = router;
