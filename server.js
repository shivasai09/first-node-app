const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials' );
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req,res,next)=>{
    let now = new Date().toDateString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(!err){
            next();
        }
        else{
            res.render('maintainence.hbs',{
                pageTitle:'this is maintainence page'
            })
        }
    })
})

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'this is home page',
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'about page'
    });
})

app.get('/bad',(req, res)=>{
    res.send({
        errorMessgae:"this page is corrupted"
    })
})


app.listen(port);