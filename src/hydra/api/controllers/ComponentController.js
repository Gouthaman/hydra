/**
 * ComponentController
 *
 * @description :: Server-side logic for managing Components
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    add: function(req, res) {
        var imageFilename = '',
            data, component;
        
        function addComponent(res, data, imgFileName) {
            Category.findOne({
                id: data.category
            }).exec(function(catErr, catRes) {
                if (catErr || !catRes) {
                    return res.json({
                        status: "209",
                        message: "Invalid category"
                    });
                }
                
                Component.create({
                    'name': data.componentName,
                    'description': data.description,
                    'image': imgFileName,
                    'referenceLink': data.referencelink,
                    'componentType': catRes,
                    'owner': req.user
                }).exec(function(err, results) {
                    console.log(results);
                    if (err) {
                        return res.json({
                            status: "209",
                            message: "Component creation failed"
                        });
                    }
                    return res.json({
                        status: "200",
                        message: "Componenet successfully created."
                    });
                });
            });
        }

        data = req.allParams();
        component = data.componentName;
        imageFilename = 'noimage.jpg';

        req.file('userPhoto').upload({
            dirname: sails.config.paths.public + "/images/",
            saveAs: function(file,cb){
                imageFilename=component+'_logo.'+file.filename.split('.')[1];
                cb(null,imageFilename);
            }
        }, function(err, files) {
            if (err) return res.serverError(err); 
            addComponent(res,data,imageFilename);            
        });        
    },
    get: function(req, res) {
        var component = Component.find().populate('componentType');
        component.exec(function(err, results) {
            if (results.length > 0)
                return res.json({
                    status: "200",
                    Compresult: results
                });
            else
                return res.json({
                    status: "209",
                    message: "No details found"
                });
        });
    }
};