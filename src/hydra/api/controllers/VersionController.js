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
    },
    addRating:function(req,res){
        var data=req.allParams();
        Version.findOne({id:data.versionName}).exec(function (vererr,verresults){
            if(vererr)
                return res.serverError(vererr);
            if(!verresults)
                return res.view("versiondetials", {
                                result: undefined,
                                compId: data.compid,
                                status: "Invalid version"
                            });
            else
            {
                VersionRating.findOne({version:verresults.id},{user:'Goutham'}).exec(function(raterr,ratresults){
                    if(raterr)
                        return res.serverError(raterr);
                    if(!ratresults)
                    {
                        VersionRating.create({
                            "user":"Goutham",
                            "version":verresults,
                            "rating":data.versionrating
                        }).exec(function(ratcreerr,ratcreresults){
                            if(ratcreerr)
                                return res.serverError(ratcreerr);
                            Version.find({
                                component: data.compid
                            }).populate('component').exec(function(errver, verresults) {
                                if (errver)
                                    return res.serverError(errver);
                                    return res.view("versiondetials", {
                                        result: verresults,
                                        compId: data.compid,
                                        status: "Rating submitted successfully"
                                    });
                            });
                        });
                    }
                    else
                    {
                        ratresults.rating=data.versionrating;
                        ratresults.save(function(uperr){
                            if(uperr)
                                res.serverError(uperr);
                            Version.find({
                                component: data.compid
                            }).populate('component').exec(function(errver, verresults) {
                                if (errver)
                                    return res.serverError(errver);
                                    return res.view("versiondetials", {
                                        result: verresults,
                                        compId: data.compid,
                                        status: "Rating submitted successfully"
                                    });
                            });
                        });
                        /*VersionRating.Update({version:verresults.id},{rating:data.versionrating}).
                        exec(function(ratuperr,ratupresults){
                            if(ratuperr)
                                return res.serverError(ratuperr);
                        });*/
                    }
                });
            }
        });
    },
    versionUsage:function(req,res){
        var data=req.allParams();
        var compId;
        Version.findOne({id:data.versionId}).exec(function(vererr,verresult){
            if(vererr)
                res.serverError(vererr);
            if(!verresult)
                return res.view("versiondetials", {
                                result: undefined,
                                compId: verresult.component,
                                status: "Invalid version"
                            });
            else
            {
                compId=verresult.component;
                VersionUsage.create({
                    "user":"Goutham",
                    "version":verresult
                }).exec(function(userr,usresult){
                    if(userr)
                        return res.serverError(userr);
                    var location = 'D:/Git/hydra/src/hydra/.tmp/public/versions/' + verresult.path;
                    var SkipperDisk = require('skipper-disk');
                    var fileAdapter = SkipperDisk();
                    fileAdapter.read(location).on('error', function (err) {
                        return res.serverError(err);
                    }).pipe(res);
                    /*res.get('/download', function(req, ress) 
                            {
                                ress.download('../../versions/' + verresult.path, verresult.path);
                            });
                    Version.find({
                                component: compId
                    }).populate('component').exec(function(errver, verresults) {
                        if (errver)
                            return res.serverError(errver);
                        return res.view("versiondetials", {
                            result: verresults,
                            compId: compId,
                            status: "downloaded submitted successfully"
                        });
                    });*/
                });                
            }
        });
    }
};