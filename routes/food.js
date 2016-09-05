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

/**
 * @api {get} /api/food/:id Get A Food Item by Id
 * @apiName GetFoodById
 * @apiDescription Find food by Id
 * @apiGroup Food
 *
 * @apiParam {Number} id The food's unique ID.
 *
 * @apiError NotFound A 404 error when the id cannot be found
 *
 * @apiSuccess {Number} id A unique number to identify a food object
 * @apiSuccess {String} name The name of the food
 * @apiSuccess {Number} price The cost of the food in pence
 *
 * @apiSuccessExample Success
 * {
 *     "id": 1,
 *     "name": "Pasta",
 *     "price": 150,
 *     "createdAt": "2016-08-25T04:19:27.000Z",
 *     "updatedAt": "2016-08-25T04:19:27.000Z"
 * }
 *
 * @apiErrorExample Not Found
 * HTTP 404
 * Not Found
 */
router.get('/:id', function (req, res) {
  models.Food.findById(req.params.id).then(function (food) {
    if (food) {
      res.send(food);
    } else {
      res.status(404).send("Not Found")
    }
  });
});

/**
 * @api {post} /api/food Create Food
 * @apiName CreateFood
 * @apiDescription Create a food item in the database
 * @apiGroup Food
 *
 * @apiError InvalidBody The body is not constructed properly
 * @apiError InvalidValues The body is in the right structure but the values are invalid
 *
 * @apiErrorExample Invalid Body
 * HTTP 400 Bad Request
 * Invalid Body
 *
 * @apiErrorExample Invalid Values
 * HTTP 400 Bad Request
 * Data is in the right structure, but the values are invalid
 *
 * @apiErrorExample Price Integer
 * HTTP 400 Bad Request
 * Price must be an integer
 *
 * @apiErrorExample Internal Error
 * HTTP 500 Internal Server Error
 * Internal Server Error
 *
 * @apiParam {String} name The name of the food
 * @apiParam {Integer} price The price of the food in pence
 *
 * @apiSuccess {Number} id The id of the the food that was created
 * @apiSuccess {String} name The name of the food
 * @apiSuccess {Number} price The price of the food in pence
 *
 * @apiSuccessExample Success
 *   {
 *     "id": 3,
 *     "name": "Pasta & cheese",
 *     "price": 20,
 *     "updatedAt": "2016-09-04T15:36:16.000Z",
 *     "createdAt": "2016-09-04T15:36:16.000Z"
 *   }
 *
 */
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
        console.error("Invalid values");
        res.status(400).send("Data is in the right structure, but the values are invalid");
      }
      console.error(e);
      res.status(500);
    }
  } else {
    console.error("Invalid body");
    res.status(400).send("Invalid body");
  }

});

/**
 * @api {put} /api/food/:id Update a food item
 * @apiName UpdateFood
 * @apiDescription Update an existing item of food
 * @apiGroup Food
 *
 * @apiParam {Number} id The food's unique ID.
 *
 * @apiError NotFound A 404 error when the id cannot be found
 * @apiError InternalServerError A 500 error when the server fails inside
 * @apiError ValueError A 400 error when the values provided are invalid
 *
 * @apiSuccess {Number} id A unique number to identify a food object
 * @apiSuccess {String} name The name of the food
 * @apiSuccess {Number} price The cost of the food in pence
 *
 * @apiSuccessExample Success
 * {
 *     "id": 1,
 *     "name": "Pasta",
 *     "price": 150,
 *     "createdAt": "2016-08-25T04:19:27.000Z",
 *     "updatedAt": "2016-08-25T04:19:27.000Z"
 * }
 *
 * @apiErrorExample Not Found
 * HTTP 404
 * Not Found
 *
 * @apiErrorExample Internal Server Error
 * HTTP 500
 * Internal Server Error
 *
 * @apiErrorExample Value Error
 * HTTP 400
 * Price must be an integer
 */
router.put('/:id', function (req, res) {
  models.Food.findById(req.params.id).then(function (food) {
    if (food) {
      if (req.body) {
        if (req.body.name) {
          food.name = req.body.name;
        }

        if (req.body.price) {
          req.body.price = parseInt(req.body.price);

          if (isNaN(req.body.price)) {
            res.status(400).send("Price must be an integer");
          }

          food.price = req.body.price;
        }

        food.save().then(function () {
          res.send(food);
        }).catch(function (e) {
          res.status(500).send("Internal Server Error");
        });
      } else {
        res.send(food);
      }
    } else {
      res.status(404).send("Not Found")
    }
  });
});

module.exports = router;
