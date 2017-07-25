'use strict';
// this controller is meant to set up routes from all other controllers
// it also sets up basic express routes

import { Router } from 'express';
import mongoose from 'mongoose';
import extrasController from './extras';
const passport = require('passport');
const Account = require('../models/account');

// load models
const Movie = mongoose.model('Movie');
var i18n = require('i18n');


// create router
const router = Router();
// load other controllers

// set basic routes
router.get('/', (req, res, next) => {
    console.log(req.body);
    console.log(req.session.user);
    res.render('index', {
        title: 'node-express',
        user : req.session.user,
        i18n: res
    })

});
router.get('/account', (req, res, next) => res.render('account', {
    title: 'node-express',
    user : req.session.user,
    i18n: res
}));
router.get('/extraes', (req, res, next) => res.render('extras', {
    title: 'node-express',
    i18n: res
}));

router.get('/login', (req, res, next) => res.render('login', {
    title: 'node-express',
    i18n: res
}));

router.post('/login',(req, res, next) => {
        req.checkBody("username","Enter a valid email address.").isEmail();
        var errors=req.validationErrors();
        if(errors)
        {
            //res.json("login failed");
            console.log("here is error");
            //return;
            return res.render('login',{errors:errors,i18n: res});
        }
        else{
            console.log('pass post');
            next();
        }
    },(req,res,next) => {
        console.log("next1");
        passport.authenticate('local',function(err,user,info){

        if(err) {return next(err);}
        console.log("next2");
        if(!user) {
            console.log("no account");

            return res.json('login failed');
        }
        else{
            console.log("next2");
            next();
        }
    })(req,res,next)}, (req, res, next) => {
    console.log("ddd");
    console.log(req.body);
    req.session.user=req.body;
        req.session.save((err) => {
            if (err) {
                console.log("make error");
                //res.json("login failed");
                return next(err);
            }
            console.log("make");
            console.log(req.body.username,req.body.password);
            res.json("sussess");
        });
    });
//router.post('/login', (req, res, next) => {
//     passport.authenticate('local', { failureRedirect: '/login', failureFlash: true });
//    console.log(req.body.username,req.body.password);
//    req.session.save((err) => {
//        if (err) {
//            return next(err);
//        }
//        res.json(req.body);
//    });
//});
router.get('/signup', (req, res, next) => res.render('signup', {
    title: 'node-express',
    i18n: res
}));
router.post('/signup',(req, res, next) => {
    req.checkBody("username","Enter a valid email address.").isEmail();
    var errors=req.validationErrors();
    if(errors)
    {
        console.log("there is error");
        return res.render('signup',{errors:"errors",i18n: res});
    }
    else{
        next();
    }
}, (req, res, next) => {
    console.log(req.body.username,req.body.password);
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
            res.json('fail');
            return res.render('register', { error : err.message });
        }
        //console.log(req.body.username,req.body.password);

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json('sussess');

                //res.redirect('/');
            });
        });
    });
});
// note that `movies` will likely be empty because the local mongodb is empty.
// you can populate it with example data by downloading it here:
// https://gist.githubusercontent.com/thekelvinliu/152f2c488430be9b6649c963d5a2afea/raw/22d73b73fb653c091d4a5ffe470299d64a0d0fb7/movies
// then navigate to the directory containing the file and run the following:
// $ mongoimport --db test --collection movies movies
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .exec((err, movies) => (err) ? next(err) : res.render('movies', {
            title: 'Movies!',
            i18n: res,
            movies
        }))
});
router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
    //req.session.save(
    //});
});
//router.get('/extras', (req, res, next) => {
//    Extras
//        .find()
//        .exec((err, movies) => (err) ? next(err) : res.render('extras', {
//            title: 'extras!',
//            i18n: res,
//            extras
//        }))
//});
//app.get('/', function (req, res) {
//  res.setLocale(req.cookies.i18n);
//  res.render('main', {
//    i18n: res
//  })
//});

router.get('/contact', function (req, res) {
    var language = req.query.language;
    i18n.setLocale(language);
  res.render('contact', {
    i18n: res
  });
});

router.get('/zh', function (req, res) {
  res.cookie('i18n', 'zh');
  res.redirect('/');
});

router.get('/en', function (req, res) {
  res.cookie('i18n', 'en');
  res.redirect('/');
});
// export router
export default router;
