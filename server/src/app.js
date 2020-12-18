/**** Node.js libraries *****/
import path from 'path';

/**** External libraries ****/
import  express from 'express'; 
import  bodyParser from 'body-parser';
import  morgan from 'morgan';
import  cors from 'cors';
import mongoose from 'mongoose';
import checkJwt from "express-jwt";

/**** link to route files ****/
import  movieRoutes from "./routes/movieRoutes.js";
import  userRoutes from "./routes/userRoutes.js";
import  roleRoutes from "./routes/roleRoutes.js";
import  categoryRoutes from "./routes/categoryRoutes.js";
import  reviewRoutes from "./routes/reviewRoutes.js";

import {secret} from "./var.js"

/**** MongoDB connection string ****/
let baseUrl = `mongodb+srv://probakilenc:1234@cluster0.0f6bt.mongodb.net/cluster0?retryWrites=true&w=majority`

mongoose.connect(baseUrl ,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err){
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected!');
    }
});


/**** Configuration ****/
const app = express(); 

export function createServer() {

  const openPaths = [
    // Open "/api/users/authenticate" for POST requests
    { url: "/api/user/authenticate", methods: ["POST"] },
  
    // Open everything that doesn't begin with "/api"
    /^(?!\/api).*/gim,
  
    // Open all GET requests on the form "/api/questions/*" using a regular expression
    
    { url: /\/api\/movie\.*/gim, methods: ["GET"] },
    { url: /\/api\/role\.*/gim, methods: ["GET"] },
    { url: /\/api\/category\.*/gim, methods: ["GET"] },
    { url: /\/api\/user\.*/gim, methods: ["GET"] },
    { url: /\/api\/review\.*/gim, methods: ["GET"] }
  ];

  // The secret value. Defaults to "the cake is a lie".
 
  // Validate the user token using checkJwt middleware.
  app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }));
  
  // This middleware checks the result of checkJwt above
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") { // If the user didn't authorize correctly
      res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
      next(); // If no errors, forward request to next middleware or route handler
    }
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  
  /**** Add routes ****/
  app.use("/api", movieRoutes());
  app.use("/api", userRoutes());
  app.use("/api", roleRoutes());
  app.use("/api", categoryRoutes());
  app.use("/api", reviewRoutes())

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );

  
  return app;
}
