const router = require('express').Router();
const { Animal, Employee, Foster } = require('../../models');

// get all Employees
router.get('/', (req, res) => {
  Employee.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get employee by id
router.get('/:id', (req, res) => {
  Employee.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
  })
    .then(dbEmployeeData => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No employee found with this id' });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//add employee to database
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Employee.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbEmployeeData => {
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  Employee.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbEmployeeData => {
    if (!dbEmployeeData) {
      res.status(400).json({ message: 'No emloyee with that email address!' });
      return;
    }

    const validPassword = dbEmployeeData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.json({ user: dbEmployeeData, message: 'You are now logged in!' });
  });
});

//update employee record
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  Employee.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbEmployeeData => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No employee found with this id' });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
//delete an employee record
router.delete('/:id', (req, res) => {
  Employee.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbEmployeeData => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: 'No employee found with this id' });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
