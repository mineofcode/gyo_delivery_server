var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var fy = require("../appmodule/menuapi/financialyear.js");
var holiday = require("../appmodule/menuapi/holiday.js");
var items = require("../appmodule/menuapi/items.js");
var gst = require("../appmodule/menuapi/gstsetting.js");

var multer = require('multer');

var root = globals.globvar.rootAPI + "/menu";

var appRouter = function(app) {
    //##################################### API Details / ###################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        console.log(req.body)
        rs.resp(res, 200, APIInfo);
    });

    //##################################### API Details / ###################################################


    //##################################### VIVEK ###########################################################

    //##################################### Financial Year ##################################################

    app.post(root + "/saveFinancialYear", fy.saveFinancialYear);
    app.post(root + "/getFinancialYear", fy.getFinancialYear);

    //##################################### Financial Year ##################################################

    //##################################### Holiday #########################################################

    app.post(root + "/saveHoliday", holiday.saveHoliday);
    app.post(root + "/getHoliday", holiday.getHoliday);

    //##################################### Holiday #########################################################

    //##################################### Items ###########################################################

    app.post(root + "/saveItemInfo", items.saveItemInfo);
    app.post(root + "/getItemDetails", items.getItemDetails);

    //##################################### Items ###########################################################

    //##################################### GST Setting #####################################################

    app.post(globals.globvar.rootAPI + "/saveGSTSetting", gst.saveGSTSetting);
    app.post(globals.globvar.rootAPI + "/getGSTSetting", gst.getGSTSetting);

    //##################################### GST Setting #####################################################

    //##################################### VIVEK ###########################################################
}

module.exports = appRouter;