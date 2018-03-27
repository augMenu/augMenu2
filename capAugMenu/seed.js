'use strict';

const model = require('./server/models/FoodModel');

const db = model.db;

const Food = model.Food;

const foods = [
    {
    name: 'NestCake',
    image: 'https://s3.us-east-2.amazonaws.com/augmenu-foodmodels/nestCake/NestCake.obj',
    }
]

const seed = () =>
  Promise.all(foods.map(food => Food.create(food)))
  

const main = () => {
  console.log('Syncing the db');
  db.sync({ force: true })
  .then(() => {
    console.log('Seeding the db');
    return seed();
  })
  .catch(err => {
    console.log('Error while seeding');
    console.log(err);
  })
  .then(() => {
    db.close();
    return null;
  });
};
main();