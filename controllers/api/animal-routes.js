const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote, Animal, Foster } = require('../../models');

// get all animals
router.get('/', (req, res) => {
  console.log('======================');
  Animal.findAll({
    attributes: [
      'id',
      'name',
      'species',
      'age',
      'weight',
      'special_needs',
      'foster_id'
    ],
    include: [
      {
        model: Foster,
        attributes: ['id', 'first_name', 'last_name', 'email', 'is_employee']
      }
    ]
  })
    .then(dbAnimalData => res.json(dbAnimalData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//get animal by id
router.get('/:id', (req, res) => {
  Animal.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'species',
      'age',
      'weight',
      'special_needs',
      'foster_id'
    ],
    include: [
      {
        model: Foster,
        attributes: ['id', 'first_name', 'last_name', 'email', 'is_employee']
      }
    ]
  })
    .then(dbAnimalData => {
      if (!dbAnimalData) {
        res.status(404).json({ message: 'No animal found with this id' });
        return;
      }
      res.json(dbAnimalData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {name: 'Fido, species: 'dog', age: 2, weight: 50}
  Animal.create({
      name: req.body.name,
      species: req.body.species,
      age: req.body.age,
      weight: req.body.weight,
      special_needs: req.body.special_needs,
      foster_id: req.body.foster_id
  })
    .then(dbAnimalData => res.json(dbAnimalData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//update animal record
router.put('/:id', (req, res) => {
  Animal.update(
    {
      name: req.body.name,
      species: req.body.species,
      age: req.body.age,
      weight: req.body.weight,
      special_needs: req.body.special_needs,
      foster_id: req.body.foster_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbAnimalData => {
      if (!dbAnimalData) {
        res.status(404).json({ message: 'No animal found with this id' });
        return;
      }
      res.json(dbAnimalData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//remove animal from database
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Animal.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbAnimalData => {
      if (!dbAnimalData) {
        res.status(404).json({ message: 'No animal found with this id' });
        return;
      }
      res.json(dbAnimalData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
