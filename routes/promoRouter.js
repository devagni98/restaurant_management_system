const express = require('express');
const bodyParser =require('body-parser');
const promoRouter = express.Router();

const mongoose = require('mongoose');
const Promos = require('../models/promotions');

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req,res,next) =>{
    Promos.find({})
    .then((Promos)=>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(Promos);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.post((req,res,next) =>{
    Promos.create(req.body)
   .then((promo)=>{
       console.log('Promotion Created');
       res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
   },(err)=>next(err))

   .catch((err) => next(err));
})
.put((req,res,next) =>{
    res.statusCode =403;
    res.end("Put method not supported on promos");
})
.delete((req,res,next) =>{
    Promos.remove({})
   .then((resp) =>{
    res.statusCode =200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
   },(err)=>next(err))
   .catch((err) => next(err));
});
promoRouter.route('/:promoId')
.get((req,res,next) =>{
    Promos.findById(req.params.promoId)
        .then((promo) =>{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(promo);
           },(err)=>next(err))
           .catch((err) => next(err));
    })
.post((req,res,next) =>{
        res.statusCode=403;
        res.end("post method not supported on/promotions/"+req.params.promoId);
    })
.put((req,res,next) =>{
    Promos.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new:true})
    .then((promo) =>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
       },(err)=>next(err))
       .catch((err) => next(err));
})
.delete((req,res,next) =>{
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) =>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
       },(err)=>next(err))
       .catch((err) => next(err));

});
module.exports =promoRouter;