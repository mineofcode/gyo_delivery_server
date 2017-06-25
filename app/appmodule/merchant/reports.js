var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var socket = require("socket");

var dayend = module.exports = {};

dayend.getDayEndReports = function getDayEndReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_dayend") + "($1,$2::json);", ['de', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}