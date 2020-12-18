import dotenv from "dotenv"
import mongoose from "mongoose"
import categoryModel from "../models/categories.js"

import Joi from "@hapi/joi"
import mainSchemas from "../schemas/schema.main.js"
const {categorySchema} = mainSchemas

dotenv.config()

export const category_post_new = (req, res) => {
    const {error} = categorySchema.validate(req)
    const errorMsg = error.details[0].message

    let category = new categoryModel({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.name,
    })
    
    return category.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /category",
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



export const category_get_all = (req,res) =>{
  categoryModel.find()
  .exec()
  .then(doc =>{
      
      res.status(200).json(doc);
  })
  .catch((err) => {
      res.status(500).json(err)
  })
}

export const category_get_byid = (req, res) => {
categoryModel.findById(req.params.category_id)
.then(cat => {
  if(!cat){
      return res.status(404).json({
          error: "Category does not exists"
      })
  }else{
    return  res.status(200).json(cat) 
  }
 
})
}

export const category_patch = (req, res) => {
  //data validation
  const {error} = Joi.valiadte(req.body, categorySchema)
  const errorMsg = error.details[0].message

  const id = req.params.category_id;
  console.log("The id: " + id, req.body)
  categoryModel.updateOne({ _id: id }, { $set: req.body }).then(
    result => {
      res.status(201).json(result)
    }
  ).catch(err => {
    res.status(500).json({
      error: errorMsg
    })
  })
}

export const category_delete = (req, res) => {
  let id = req.params.category_id
  movieModel.deleteOne({_id: id})
  .exec()
  .then(result => {
      res.status(200).json({
          deletedElemenetd: result
      })
  })
}
