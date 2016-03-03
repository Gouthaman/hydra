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
                    return res.view("homepage", {
                        result: undefined,
                        status: "Failed",
                        message: "Invalid category",
                        Compresult: undefined
                    });
                }
                
                Component.create({
                    'name': data.componentName,
                    'description': data.description,
                    'image': imgFileName,
                    'referenceLink': data.referencelink,
                    'componentType': catRes,
                    'owner': "Goutham"
                }).exec(function(err, results) {
                    console.log(results);
                    if (err) {
                        return res.view("homepage", {
                            result: undefined,
                            status: "Failed",
                            message: "Component creation failed",
                            Compresult: undefined
                        });
                    }
                    return res.view("homepage", {
                        result: undefined,
                        status: "Success",
                        message: "Componenet successfully created.",
                        Compresult: undefined
                    });
                });
            });
        }

        data = req.allParams();
        component = data.componentName;
        imageFilename = '/hydra/assets/images/noimage.jpg';

        req.file('userPhoto').upload({
            maxBytes: 10000000,
            dirname: 'C:/wamp/www/hydra/assets/images/',
            saveAs: function(file){
                if(file){
                    imageFilename = '/hydra/assets/images/' + component + '_logo.' + file.filename.split('.')[1];
                }
                return imageFilename;
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
                return res.view("homepage", {
                    result: undefined,
                    status: "",
                    message: "",
                    Compresult: results
                });
            else
                return res.view("homepage", {
                    result: undefined,
                    status: "",
                    message: "No details found",
                    Compresult: undefined
                });
        });
    }
};