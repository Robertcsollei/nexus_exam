
    import express from "express";
    import * as roles from "../controllers/RoleController.js"
  
    const router = express.Router();

const roleRoutes = () => {

    /**** Routes ****/
    router.get('/role', roles.role_get_all);
  
    router.get('/role/:role_id', roles.role_get_byid)
    
    router.post('/role',roles.role_post_new);
  
  
    router.patch('/role/:role_id', roles.role_patch);
  
    router.delete('/role/:role_id', roles.role_delete);
  
  
  
    return router;
  }

  export default roleRoutes
  