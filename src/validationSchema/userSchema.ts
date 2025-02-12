import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'driver').default('user'),
    createdAt: Joi.date().default(() => new Date())
});