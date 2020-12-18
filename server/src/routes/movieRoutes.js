import express from "express";
import * as movies from "../controllers/MovieController.js"
const router = express.Router();

const movieRoutes = () => {


  /**** Routes ****/
  router.get('/movie', movies.movies_get_all);

  router.get('/movie/:movie_id', movies.movie_get_byid)
  
  router.post('/movie',movies.movie_post_new);

  router.get('/getmovies/:category_id', movies.movie_get_byCat)

  router.patch('/movie/:movie_id', movies.movie_patch);

  router.patch('/movie/rating/:movie_id', movies.movie_modify_rating);

  router.delete('/movie', movies.movie_delete);


  router.get('/movie/:name', async (req, res) => {
    res.json({msg: `Hello, ${req.params.name}`});
  });

  return router;
}

export default movieRoutes