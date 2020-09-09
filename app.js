const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Making a session with a given key

app.use(cookieParser());
app.use(session({
    'secret': 'ITISDEV',
    'name': "cookie",
    'resave': true,
    'saveUninitialized': true
}));

// Initialize the view
app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, 'views/'));
app.engine('hbs', exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: 'views/partials',
    layoutsDir: 'views/layouts',
    helpers: {
        getDate: function(date) {
            var d = new Date(date);
            let formatted_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
            return d.getFullYear() + '-' + (d.getMonth() + 1) + "-" + d.getDate()
        },

        getPrice: function(price) {
            return price.toFixed(2);
        }
    }
}).engine);
app.set('view engine', 'hbs');

// MIDDLEWARES => functions that run before we execute the control functions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTERS
const indexRouter = require('./router/indexRouter');
app.use('/', indexRouter)

// log this in console when ran
app.listen(PORT, () => {
    console.log(`Listening to localhost on port ${PORT}`);
});