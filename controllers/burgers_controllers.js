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


router.post('/burgers/create', function(req, res) {
    db.burger.create({ burger_name: req.body.burger_name }).then(function(data) {
        res.redirect('/burgers')
    })
});
router.put("/burgers/update/devour/:id", function(req, res) {
    return db.Customer.create({
        customer_name: req.body.customer
    }).then(function(newCustomer) {
        return db.Burger.update({
            devoured: req.body.devoured,
            CustomerId: newCustomer.id
        }, {
            where: {
                id: req.params.id
            },
            include: [db.Customer]
        });
    }).then(function() {
        res.redirect("/burgers");
    });
});

// router.put("/burgers/update/return/:id", function(req, res) {
//     return db.Burger.update({
//         devoured: req.body.devoured
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(function() {
//         res.redirect("/burgers");
//     });
// });

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
