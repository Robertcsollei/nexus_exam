

  import express from "express";
  import * as user  from "../controllers/UserController.js"
   const router = express.Router();
  
const userRoutes = () => {
  console.log("route")
    /**** Routes ****/
    router.get('/user', user.user_get_all);

    router.post('/user', user.user_post_new);
  
    router.get('/user/:user_id', user.user_get_byid)
  
    router.patch('/user/:user_id', user.user_patch);
  
    router.delete('/user/:user_id', user.user_delete);

    router.post("/user/authenticate", user.user_login);
  
  
    return router;
  }


  export default userRoutes
  