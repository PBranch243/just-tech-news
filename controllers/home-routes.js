const router = require('express').Router();
const sequelize = require('../config/connection');
const { Employee, Animal, Foster } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Animal.findAll({
    attributes: [
      'id',
      'name',
      'species',
      'age',
      'weight',
      'special_needs'
    ],
    include: [
      {
        model: Foster,
        attributes: ['id', 'first_name', 'last_name', 'email']
      }
    ]
  })
    .then(dbAnimalData => {
      const animals = dbAnimalData.map(animal => animal.get({ plain: true }));

      res.render('homepage', { animals });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//login route
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
