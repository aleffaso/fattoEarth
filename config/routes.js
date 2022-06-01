const express = require("express");
const routes = express.Router();

const Article = require('../db/Article');
const Category = require('../db/Category');


//main page
routes.get('/', (req,res) => {
    res.render("index", {token: req.session.token}); 
});

//Blog page
routes.get('/blog', (req,res) => {
    Article.findAll({
        order:[['id', 'ASC']],
        include: [{model: Category}] //include Category table
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("blog", {articles: articles, token: req.session.token, categories: categories});
        }).catch(err => {
            res.redirect("/");
        });
    }).catch(err => {
        res.redirect("/");
    });
});

module.exports = routes;