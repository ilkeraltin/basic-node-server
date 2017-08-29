const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    //return 'test';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine','hbs');

//logger
app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} : ${req.url} `;
    console.log(log);
    fs.appendFile('error.log', log + '\n' ,  (err) => {
        if (err) {
            console.log('error:',err);
        }
    });
    next();
});

//maintenance mode
/* app.use((req,res,next) => {
    res.render('maintenance.hbs');
}); */

//serving static files 
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    //res.send('<h1>hello express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'Welcome to my page ilkeraltin.com'
    })
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Bad request!'
    });
});


app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
});

app.listen(port, () => {
    console.log(`server is up at port ${port}`)
});