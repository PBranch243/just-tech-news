const Animal = require('./Animal');
const Employee = require('./Employee');
const Foster = require('./Foster');

// one foster can have many animals (at a given time)
// one animal can only be fostered by one person (at once)
Animal.belongsTo(Foster, {
    foreignKey: 'foster_id',
    onDelete: 'SET NULL'
});

Foster.hasMany(Animal, {
    foreignKey: 'foster_id'
});

module.exports = {
    Animal,
    Employee,
    Foster
};