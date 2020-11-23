const { AuthenticationError } = require('apollo-server');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('./../configs');

module.exports =(context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = JWT.verify(token,JWT_SECRET);
                return user;
            }
            catch(err){
                throw new AuthenticationError("invalid/Expired Token")
            }
        }
        throw new Error('Authorization error token must be Bearer token')
    }
    throw new Error('Authorization error token not Provided')
}
