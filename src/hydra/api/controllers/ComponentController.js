/**
 * ComponentController
 *
 * @description :: Server-side logic for managing Components
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res) {
		var filenamedy=req.file('userPhoto')._files[0].stream.filename.split('.')[1];
		var data=req.allParams();
		var component=data.componentName;
		var imageFilename=component+'_logo.'+filenamedy;
		req.file('userPhoto').upload({
   			dirname:'C:/wamp/www/hydra/assets/',saveAs:imageFilename},function(err,files){
   				sails.log.debug('file is :: ', +files[0]);
   				if (err) return res.serverError(err);   
   				var _compType;
   				Category.findOne({id:data.category}).exec(function(err, res){
   					if(err || !res){
   						return res.view("homepage", { result: undefined, status: "Failed", message: "Invalid category",Compresult:undefined });
   					}
   					_compType = res;
   					Component.create({
	                    'name': data.componentName,
	                    'description':data.description,
	                    'image':'/hydra/assets/'+imageFilename,
	                    'referenceLink':data.referencelink,
	                    'componentType':_compType,
	                    'owner':"Goutham"
	                }).exec(function (err, results) {
	                    console.log(results);
	                    if (err) {
	                    	return res.view("homepage", { result: undefined, status: "Failed", message: "Component creation failed",Compresult:undefined });
	                    }
	                    return res.view("homepage", { result: undefined, status: "Success", message: "Componenet successfully created.",Compresult:undefined });
	                });
   				});     			
   			});
		},
		get:function(req,res){
			var component=Component.find().populate('componentType');
			component.exec(function (err, results) {
            if (results.length > 0)
                return res.view("homepage", { result: undefined, status: "", message: "",Compresult:results });
            else
                return res.view("homepage", { result: undefined, status: "", message: "No details found",Compresult:undefined });
        	});
		}
};