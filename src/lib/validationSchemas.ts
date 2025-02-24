import Joi from 'joi';

export const gadgetSchema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('Available', 'Deployed', 'Destroyed').default('Available'),
});


export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'driver').default('user'),
    createdAt: Joi.date().default(() => new Date())
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});