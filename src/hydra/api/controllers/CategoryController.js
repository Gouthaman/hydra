/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    defaultaction: function (req, res) {
        return res.view("homepage", { result: undefined, status: "", message: "" });
    },
    addCategory: function (req, res) {
        var data = req.allParams();

        console.log(data.name);
        if (data.name && data.name.length == 0)
            return res.view("homepage", { result: undefined, status: "Failed", message: "Category Name empty" });

        var selectcategory = Category.find();
        selectcategory.where({ 'name': data.name });
        selectcategory.exec(function (err, results) {
            console.log(results);
            if (results.length > 0) {
                return res.view("homepage", { result: undefined, status: "Failed", message: "Category already exist" });
            }
            else {
                Category.create({
                    'name': data.name
                }).exec(function (err, results) {
                    console.log(results);
                    if (err) {
                        return res.view("homepage", { result: undefined, status: "Failed", message: "Category creation failed" });
                    }
                    return res.view("homepage", { result: undefined, status: "Success", message: "Category successfully created." })
                });
            }
        });
    },
    getCategories: function (req, res) {

        var getCategory = Category.find();
        getCategory.exec(function (err, results) {
            if (results.length > 0)
                return res.view("homepage", { result: results, status: "", message: "" });
            else
                return res.view("homepage", { result: undefined, status: "", message: "No details found" });
        });


    }
};

