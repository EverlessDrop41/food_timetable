var express = require('express');
var router = express.Router();

models = require("../models");

/**
 * @api {get} /api/food/ Get All Food
 * @apiName GetFood
 * @apiDescription Gets all food objects in database
 * @apiGroup Food
 *
 * @apiUse InternalError
 *
 * @apiSuccess {object[]} food The food in the database
 * @apiSuccess {Number} food.id A unique number to identify a food object
 * @apiSuccess {String} food.name The name of the food
 * @apiSuccess {Number} food.price The cost of the food in pence
 *
 * @apiSuccessExample Single Food Object
 *    {
 *      "food": [
 *        {
 *          "id": 1,
 *          "name": "Pasta",
 *          "price": 150,
 *          "createdAt": "2016-08-25T04:19:27.000Z",
 *          "updatedAt": "2016-08-25T04:19:27.000Z"
 *        }
 *      ]
 *    }
 *
 * @apiSuccessExample Multiple Food Objects
 *    {
 *      "food": [
 *        {
 *          "id": 1,
 *          "name": "Pasta",
 *          "price": 150,
 *          "createdAt": "2016-08-25T04:19:27.000Z",
 *          "updatedAt": "2016-08-25T04:19:27.000Z"
 *        },
 *        {
 *          "id": 2,
 *          "name": "Pizza",
 *          "price": 100,
 *          "createdAt": "2016-08-25T04:19:27.000Z",
 *          "updatedAt": "2016-08-25T04:19:27.000Z"
 *        }
 *      ]
 *    }
 */
router.get('/', function (req, res) {
  models.Food.findAll()
    .then(function(food) {
    res.send({food: food});
  }).catch(function (err) {
    console.error(err);
    res.send({
      error: "Internal Server Error",
      code: "500"
    });
  });
});

router.post("/", function(req, res) {
  if (req.body && req.body.name && req.body.price) {
    try {
      req.body.price = parseInt(req.body.price);

      if (isNaN(req.body.price)) {
        res.status(400).send("Price must be an integer");
      }

      models.Food.create({
        name: req.body.name, price: req.body.price
      }).then(function (food) {
        console.log(food.id);
        res.send(food);
      });
    } catch (e) {
      if (e instanceof models.Sequelize.ValidationError) {
        console.error("Invalid food creation");
        res.status.send("Data is in the right structure, but the values are invalid");
      }
      console.error(e);
      res.status(500);
    }
  } else {
    console.error("Invalid body");
    res.status(400).send("Invalid body");
  }

});

module.exports = router;
