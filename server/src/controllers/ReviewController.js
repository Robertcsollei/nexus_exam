import dotenv from "dotenv"
import mongoose from "mongoose"
import reviewModel from "../models/reviews.js"
import userModel from "../models/users.js"
import movieModel from "../models/movies.js"

import Joi from "@hapi/joi"
import mainSchemas from "../schemas/schema.main.js"
const {reviewSchema} = mainSchemas

dotenv.config()

export const review_post_new = (req, res) => {
    const {error} = reviewSchema.validate(req)
    const errorMsg = error.details[0].message
    let movieId = req.params.movie_id
    console.log(movieId)
    //first check if the user exists who have posted the review, if it does, contimues to find and return the review
   
    userModel.findById(req.body.user_id)
    .then(user => {
 
        if(!user){
           
            return res.status(404).json({
                error: "User not found, you must log in to be able to review"
            })
        }
    })
    movieModel.findById(movieId).then(movie => {
        
        if(!movie){
            return res.status(404).json({
                error: "Movie not found, you must log in to be able to review"
            })
        }
    })

    let review = new reviewModel({
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.title,
        Body: req.body.body,
        PostDate:  Date.now(),
        UserId: req.body.user_id,
        MovieId: req.body.movie_id,
        Rating: req.body.rating
    })

    review.save()
    //also pushes the review id to the movie on which it exists
    movieModel.findById(movieId)
    .exec()
    .then(qst => {
       
            const reviews = qst.Reviews
            reviews.push(review)
            const ratings = (qst.Rating + req.body.rating) / 2
            const updatedOps = {}
            updatedOps["reviews"] = reviews
            //console.log(updatedOps)
            let newQst = {
                _id: qst._id,
                Title: qst.Title,
                Body: qst.Body,
                Tags: qst.Tags,
                YearOfRelease:  qst.YearOfRelease,
                Categoryid: qst.Categoryid,
                MovieImage: qst.MovieImage,
                Reviews: reviews,
                Rating: ratings
            }
            console.log(newQst)
            
           movieModel.updateOne({_id: movieId}, {$set: updatedOps})
           .exec()
           .then(result => {
               console.log(result);
               res.status(200).json({
                   success: result,
                   newQst: newQst
               
               });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
               error: err
               });
           });
        
        
    })
    
}


//get all reviews by a specific user
export const review_get_all_byUser = (req,res) =>{
    let userreviews = []
    userModel.find()
    .then(qst => {
        for(let cmt in qst.reviews){
            if(cmt.UserId === req.body.user_id){
                userreviews.push(cmt)
            }
            res.status(200).json(userreviews)
        }
    }).catch(err => {
        res.status(500).json(err)    
    })
}


//get all reviews by a specific user
export const review_get_all_byMovie = (req,res) =>{
    console.log(req.params.movie_id)
    let userreviews = []
    reviewModel.find()
    .exec()
    .then(qst => {
        
        qst.map((el) => {
            
            if(el.MovieId == req.params.movie_id){
                userreviews.push(el)
            }
        })
         
            res.status(200).json(userreviews)
        
    })
    
    .catch(err => {
        res.status(500).json(err)    
    })
}

export const review_get_byid = (req, res) => {
reviewModel.findById(req.params.review_id)
.then(cmt => {
  if(!cmt){
      return res.status(404).json({
          error: "review does not exists"
      })
  }
  return res.status(200).json(cmt) 
})
}

export const review_patch = (req, res) => {
  const id = req.params.review_id;
  reviewModel.updateOne({ _id: id }, { $set: req.body }).then(result => {
      res.status(201).json(result)
  }).catch(err => {
      res.status(500).json(err)
  })
}

//Update the Vote state on the review object - being called on every vote change
export const review_modify_voted = (req, res) => {
    const id = req.params.review_id;
    let value = 0
    if(req.body.add === true){
        value = 1
    }else{
        value =  -1
    }

    reviewModel.findById({_id: id})
    .exec()
    .then(cmt => {
        cmt.Votes += value
        console.log(cmt.Votes)
        cmt.save()
        .then(result => {
            res.status(201).json({success: result})
        }).catch(err => {
            res.status(500).json({error: err})
        })
    })

}


export const review_delete = (req, res) => {
  let id = req.params.review_id
  reviewModel.deleteOne({_id: id})
  .exec()
  .then(result => {
      res.status(200).json({
          deletedElemenetd: result
      })
  })
}
