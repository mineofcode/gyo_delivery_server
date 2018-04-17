var db = require("db");
const gen = require("gen");
var rs = gen.res;

var globals = gen.globals;
var download = gen.download;

var http = require('http');
var socket = require("socket");
var uniqid = require('uniqid');

var order = module.exports = {};
var sms_email = require("../schoolapi/sendsms_email.js");

// Order

order.getOrderDetails = function getOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_orderdetails") + "($1,$2::json);", ['ord', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.saveOrderDelivery = function saveOrderDelivery(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_orderdelivery") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.saveValidOrder = function saveValidOrder(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funvalid_saveorder") + "($1,$2::json);", ['validord', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    var newordkey = uniqid();
    req.body.ordkey = newordkey;

    db.callFunction("select " + globals.menuschema("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        if (req.body.status == 0) {
            var _d = data.rows[0].funsave_orderinfo;

            var _uname = _d.uname;
            var _uphone = _d.uphone;
            var _uemail = _d.uemail;
            var _ordno = _d.ordno;
            var _ordkey = _d.ordkey;
            var _totpayamt = _d.totpayamt;
            var _delvminute = _d.delvminute;

            var params = {
                "flag": "sendorder",
                "username": _uname,
                "ordno": _ordno,
                "totpayamt": _totpayamt,
                "delv_minute": _delvminute,
                "ordkey": _ordkey
            };

            sms_email.sendEmailAndSMS(params, _uphone, _uemail);

            socket.io.sockets.in(req.body.olid).emit('ordmsg', {
                "evt": "neword",
                "data": {
                    "ordno": _ordno,
                    "ordkey": _ordkey
                }
            });
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// Rating

order.saveOrderRating = function saveOrderRating(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_orderrating") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.getOrderRating = function getOrderRating(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_orderrating") + "($1,$2::json);", ['ordrat', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}