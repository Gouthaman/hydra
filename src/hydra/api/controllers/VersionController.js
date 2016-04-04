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
                return res.json({
                    status: "200",
                    result: results,
                    compId: componentId
                });
            else
                return res.json({
                    status: "209",
                    compId: componentId,
                    message: "No data found"
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
                        return res.json({
                            status:"209",
                            compId: compId,
                            message: "Creation failed"
                        });
                    Version.find({
                        component: compId
                    }).populate('component').exec(function(errver, verresults) {
                        if (errver)
                            return res.serverError(errver);
                            return res.json({
                                status:"200",
                                result: verresults,
                                compId: compId
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
                return res.json({
                                status: "209",
                                compId: data.compid,
                                message: "Invalid version"
                            });
            else
            {
                VersionRating.findOne({version:verresults.id},{user:'Goutham'}).exec(function(raterr,ratresults){
                    if(raterr)
                        return res.serverError(raterr);
                    if(!ratresults)
                    {
                        VersionRating.create({
                            "user":req.user,
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
                                    return res.json({
                                        status:"200",
                                        message: "Rating submitted successfully",
                                        result: verresults,
                                        compId: data.compid
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
                                    return res.json({
                                        status:"200",
                                        message: "Rating submitted successfully",
                                        result: verresults,
                                        compId: data.compid
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
                return res.json({
                                status: "209",
                                compId: verresult.component,
                                message: "Invalid version"
                            });
            else
            {
                compId=verresult.component;
                VersionUsage.create({
                    "user":req.user,
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