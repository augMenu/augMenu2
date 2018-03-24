'use strict';

const model = require('./server/models/FoodModel');

const db = model.db;

const Food = model.Food;

const foods = [
    {
    name: 'Cheeseburger',
    image: 'https://poly.google.com/view/eke7qcu_FR2',
    },
    {
    name: 'Supreme Pizza',
    image: 'https://poly.google.com/view/efHt8L0V77z',
    },
    {
      name: 'Hamburger',
      image: 'https://poly.google.com/view/7ZLzqvaiFh7',
    },
    {
      name: 'sammich',
      image: 'https://poly.google.com/view/9TD15OhRzW9',
    },
    {
      name: 'donut',
      image: 'https://poly.google.com/view/8n0uUzRmWsw',
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