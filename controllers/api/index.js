
const router = require('express').Router();

const animalRoutes = require('./animal-routes');
const employeeRoutes = require('./employee-routes');

router.use('/animals', animalRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;