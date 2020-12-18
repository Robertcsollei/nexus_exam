import mongoose from "mongoose"
import roleModel from "../models/roles.js"

import Joi from "@hapi/joi"
import mainSchemas from "../schemas/schema.main.js"
const {roleSchema} = mainSchemas



export const role_get_all = (req,res) =>{
    roleModel.find()
    .exec()
    .then(doc =>{
        
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}

export const role_post_new = (req, res) => {
  const {error} = roleSchema.validate(req)
  const errorMsg = error.details[0].message

    let role = new roleModel({
        _id: new mongoose.Types.ObjectId(),
        RoleName: req.body.roleName,
        AddContent: req.body.addContent,
        ModifyContent: req.body.modifyContent,
    })
    return role.save()
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

export const role_get_byid = (req, res) => {
    roleModel.findById(req.params.role_id)
    .then(role => {
      if(!role){
          return res.status(404).json({
              error: "role does not exists"
          })
      }
      return res.status(200).json(role) 
    })
    }
    
    export const role_patch = (req, res) => {
      const id = req.params.role_id;
      const updatedOps = {};
      for(const ops of req.body){
          updatedOps[ops.propName] = ops.value; 
      }
      movieModel.updateOne({ _id: id }, { $set: updatedOps })
    }
    
    export const role_delete = (req, res) => {
      let id = req.params.role_id
      movieModel.deleteOne({_id: id})
      .exec()
      .then(result => {
          res.status(200).json({
              deletedElemenetd: result
          })
      })
    }
    