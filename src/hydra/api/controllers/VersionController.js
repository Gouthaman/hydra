/**
 * VersionController
 *
 * @description :: Server-side logic for managing Versions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    get: function(req, res) {
        var componentId = req.params.compid;
        Version.find({
            component: componentId
        }).populate('component').exec(function(err, results) {
            if (err)
                return res.serverError(err);
            if (results.length > 0)
                return res.view("versiondetials", {
                    result: results,
                    compId: componentId,
                    status: ""
                });
            else
                return res.view("versiondetials", {
                    result: undefined,
                    compId: componentId,
                    status: "No versions"
                });
        });
    },
    add: function(req, res) {
        var data = req.allParams();
        var verFilename,compId=data.compid;
        req.file('verisonFile').upload({
                dirname: sails.config.paths.public + "/versions/",
                saveAs: function(file, cb) {
                    verFilename = file.filename;
                    cb(null, verFilename);
                }
            },
            function(err, results) {
                if (err) res.serverError(err);
                Version.create({
                    'name': data.versionName,
                    'component': compId,
                    'description': data.description,
                    'path': verFilename,
                    'recommended': false,
                    'active': true
                }).exec(function(vererr, verresu) {
                    if (vererr)
                        return res.view("versiondetials", {
                            result: undefined,
                            compId: compId,
                            status: "Creation failed"
                        });
                    Version.find({
                        component: compId
                    }).populate('component').exec(function(errver, verresults) {
                        if (errver)
                            return res.serverError(errver);
                            return res.view("versiondetials", {
                                result: verresults,
                                compId: compId,
                                status: "Successfully created"
                            });
                    });
                });
            });
    }
};