const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const sess = {
  //replace secret with actual secret stored in .env
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true, 
  store: new SequelizeStore({
    db: sequelize
  })
};


const app = express();
const PORT = process.env.PORT || 3001;
app.use(session(sess));




const hbs = exphbs.create({});
 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});