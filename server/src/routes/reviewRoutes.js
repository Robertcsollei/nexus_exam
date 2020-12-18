import express from "express";
import * as review from "../controllers/reviewController.js"
const router = express.Router();

const reviewRoutes = () => {

    /**** Routes ****/
    router.get('/review', review.review_get_all_byUser);
  
    router.get('/review/:review_id', review.review_get_byid)

    router.get('/review/movie/:movie_id', review.review_get_all_byMovie)
    
     router.post('/review/:movie_id', review.review_post_new);
  
     router.patch('/review/votes/:review_id', review.review_modify_voted)
  
    router.patch('/review/:review_id', review.review_patch);
  
    router.delete('/review/:review_id', review.review_delete);
  

  
    return router;
  }

  export default reviewRoutes
  