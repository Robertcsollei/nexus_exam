import Joi from "@hapi/joi"


const mainSchemas = {

    movieSchema: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().min(15).required(),
        tags: Joi.array(),
        yearOfRelease: Joi.date(), 
        categoryid: Joi.string().uuid(),
        movieImage: Joi.string().uri(),
        reviews: Joi.array(),
        rating: Joi.number(),
    }),

    reviewSchema: Joi.object({
        title: Joi.string().min(2).required(),
        body: Joi.string().min(15),
        userId: Joi.string().uuid(),
        rating: Joi.number().required()
    }),

    categorySchema: Joi.object({
        name: Joi.string().min(5).required()
    }),

    roleSchema: Joi.object({
        roleName: Joi.string().required(),
        addContent: Joi.bool(),
        modifyContent: Joi.bool()
    }),

    userSchema: Joi.object({
        UserName: Joi.string().min(3).required(),
        Password: Joi.string().min(6).required(),
        Email: Joi.string().email().required(),
        Description: Joi.string().min(15),
        UserRole: Joi.string().uuid(),
        isBlocked: Joi.bool(),
        ProfileImage: Joi.string().uri()
     })

}



export default mainSchemas
