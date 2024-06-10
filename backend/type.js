const zod = require('zod');

const signup = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

module.exports = {signup, updateBody};