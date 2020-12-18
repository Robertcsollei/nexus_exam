import dotenv from "dotenv"
import mongoose from "mongoose"
import userModel from "../models/users.js"

import {secret} from "../var.js"
import mainSchemas from "../schemas/schema.main.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const {userSchema} = mainSchemas

dotenv.config()

export const user_get_all = (req,res) =>{
  console.log("getall")
    userModel.find()
    .exec()
    .then(doc =>{
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

export const user_post_new = (req, res) => {
    const {error} = userSchema.validate(req)
    const errorMsg = error.details[0].message

    let user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        UserName: req.body.userName,
        Password: req.body.password,
        Email: req.body.email,
        Description: req.body.description,
        RegistrationDate: Date.now(),
        UserRole: req.body.role_id,
        isBlocked: false,
        ProfileImage: req.body.profileImage,
        LogedIn: true
    })
    return user.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /role",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: errorMsg
        });
      });
}

export const user_get_byid = (req, res) => {
    userModel.findById(req.params.user_id)
    .then(user => {
      if(!user){
          return res.status(404).json({
              error: "user does not exists"
          })
      }
      return res.status(200).json(user)
    })
    }
    
    export const user_patch = (req, res) => {
      const id = req.params.user_id;
      const updatedOps = {};
      for(const ops of Object.keys(req.body)){
          updatedOps[ops.propName] = ops.value; 
      }
      userModel.updateOne({ _id: id }, { $set: updatedOps }).exec()
    }
    
    export const user_delete = (req, res) => {
      let id = req.params.user_id
      userModel.deleteOne({_id: id})
      .exec()
      .then(result => {
          res.status(200).json({
              deletedElemenetd: result
          })
      })
    }
    
    export const user_login = (req, res) => {
      const username = req.body.userName;
      const password = req.body.password;
  
      if (!username || !password) {
        let msg = "Username or password missing!";
        console.error(msg);
        res.status(401).json({ msg: msg });
        return;
      }
  
      userModel.findOne({ UserName: username})
      .exec()
      .then(user => {
        
        if (user) { // If the user is found
          if (bcrypt.compareSync(password, user.Password)) {
            const payload = { UserName: username };
            const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
    
            res.json({
              msg: `User '${username}' authenticated successfully`,
              token: token
            });
          } else {
            res.status(401).json({ msg: "Password mismatch!" })
          }
        } else {
          res.status(404).json({ msg: "User not found!" });
        }
 
      })
     
    }
    