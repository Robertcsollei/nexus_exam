import dotenv from "dotenv"
import mongoose from "mongoose"
import movieModel from "../models/movies.js"
import categoryModel from "../models/categories.js"
import userModel from "../models/users.js"

import Joi from "@hapi/joi"
import mainSchemas from "../schemas/schema.main.js"
const {movieSchema} = mainSchemas
dotenv.config()



export const movies_get_all = (req,res) =>{
    movieModel.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

export const movie_get_byid = (req, res) => {
    movieModel.findById(req.params.movie_id)
    .then(qst => {
        if(!qst){
            return res.status(404).json({
                error: "movie under this ID does not exists"
            })
        }
        return res.status(200).json(qst) 
    })
} 

//Get all movies which share the same Category
export const movie_get_byCat = (req, res) => {
movieModel.find({Categoryid: req.params.category_id})
.exec()
.then(qst => {
    if(!qst){
        return res.status(404).json({
            error: "movie under this ID does not exists"
        })
    }
    return res.status(200).json(qst) 

})
}


export const movie_patch = (req, res, next) => {
    const {error} = movieSchema.valiadte(req.body)
    const errorMsg = error.details[0].message

    const id = req.params.movie_id;

    movieModel.updateOne({ _id: id }, { $set: req.body }).then(result => {
        res.status(201).json({success: result})
    }).catch(err => {
        res.status(500).json({error: errorMsg})
    })
}

//Adds / Substracts from the Rating 
export const movie_modify_rating = (req, res) => {

    
    const id = req.params.movie_id;
  

    movieModel.findById({_id: id})
    .exec()
    .then(qst => {
        qst.Rating = body.req.rating
        qst.save()
        .then(result => {
            res.status(201).json({success: result})
        }).catch(err => {
            res.status(500).json({error: err})
        })
    })
}

//Check if the user who posts the movie, and the movie category exists. Than creates a new movie in the DB
export const movie_post_new = (req, res) => {



    categoryModel.findById(req.body.category_id)
    .then(doc => {
        if(!doc){
            return res.status(404).json({
                error: "Category not found"
            })
        }
    })

   var newmovie = new movieModel({
    _id: new mongoose.Types.ObjectId,
    Title: req.body.title,
    Body: req.body.body,
    Tags: req.body.tags,
    YearOfRelease: req.body.release,
    Categoryid: req.body.category_id,
    MovieImage: req.body.images,
    Reviews: req.body.reviews,
    Rating: req.body.rating
   })

   return newmovie
   .save()
   .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Handling POST requests to /movie",
      createdProduct: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

export const movie_delete = (req, res) => {
    let id = req.params.category_id
    movieModel.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            deletedElemenetd: result
        })
    })
}