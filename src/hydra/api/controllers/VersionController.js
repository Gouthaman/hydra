/**
 * VersionController
 *
 * @description :: Server-side logic for managing Versions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 module.exports = {
 	get: function(req, res) {
 		var componentId = req.compid;
 		var version = Version.find({
 			component: componentId
 		});
 		version.exec(function(err, results) {
 			if (err)
 				return res.serverError(err);
 			if (results.length > 0)
 				return res.view("versiondetials", {
 					result: results
 				});
 			else
 				return res.view("versiondetials", {
 					result: undefined
 				});
 		});
 	},
 	add: function(req, res) {
 		var data = req.allparams();
 		var component = Component.findOne({
 			id: data.compid
 		});
 		component.exec(function(err, results) {
 			if (err || !results)
 				return res.serverError(err);
 			Version.create({
 				'name': data.versionName,
 				'component': results,
 				'description': data.description,
 				'path': '/hydra/assets/component',
 				'recommended': false,
 				'active': true
                    //'ratings':,
                    //'downloads':
                }).exec(function(err, res) {
                	if (err)
                		return res.view();
                	return res.view();
                });
            });
 	}
 };