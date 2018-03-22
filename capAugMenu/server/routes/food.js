const router = require('express').Router();
const { Food } = require('../models');
module.exports = router


router.get('/', (req, res, next) => {
	Food.findAll({})
		.then((foods) => {
			res.status(200).json(foods);
		})
		.catch(next);
})


router.get('/food/:foodName', (req, res, next) => {
	console.log('we want this thing', req.params.foodName)
	Food.findOne({
		where: {
			name: req.params.foodName
		}
	})
		.then((food) => {
			res.json(food)
		})
		.catch(next);

})

router.post('/new-food', (req, res, next) => {
	Food.create(req.body)
		.then((food) => {
			res.status(201).json(food)
		})
		.catch(next);
})


