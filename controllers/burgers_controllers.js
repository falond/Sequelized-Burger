var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {
    res.redirect("/burgers");
});

 router.get('/burgers', function(req, res) {
    db.burger.findAll({}).then(function(data) {
        var hbsObject = { burgers: data }
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});


router.post("/burgers/create", function(req, res) {
    db.burger.create({ burger_name: req.body.burger_name }).then(function(data) {
        res.redirect('/burgers')
    })
});

// router.put('/burgers/update/:id', function(req, res){
//     var condition = 'id = ' + req.params.id;

//     console.log('condition ', condition);

//     db.burger.update({'devoured': req.body.devoured, condition}).then(function(data){
//         res.redirect('/burgers');
//     });
// });

router.put("/burgers/update/:id", function(req, res) {
    return db.burger.update({
        devoured: req.body.devoured
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/burgers");
    });
});

// router.delete("/burgers/delete/:id", function(req, res) {
//     return db.Burger.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function() {
//         res.redirect("/burgers");
//     });
// });

module.exports = router;
