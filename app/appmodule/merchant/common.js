var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var common = module.exports = {};

common.getAutoData = function getAutoData(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_auto") + "($1,$2::json);", ['auto', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.getDropDownData = function getDropDownData(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_dropdown") + "($1,$2::json);", ['ddl', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}