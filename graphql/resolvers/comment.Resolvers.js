const Post = require("../../models/posts.model");
const checkAuth = require("../../middlewares/checkAuth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
    Query:{
    },
    Mutation:{
        async createComment(_,{postId,body},context){
            const {username} = checkAuth(context); 
            if(body.trim === ""){
                throw new UserInputError("comment must not be empty",{errors:{
                    body:"comment should have content"
                }})
            }
            try{
                const post =await Post.findById(postId)
                if(post){
                    post.comments.unshift({
                        username,
                        body,
                        createdAt:new Date()
                    }) 
                    await post.save();
                    return post;
                }
            }
            catch(err){
                throw new UserInputError("No Content", {
                    errors: {
                      body: "comment content is required",
                    },
                  });
                
            }
        },
        async deleteComment(_,{postId,commentId},context){
            const {username} = checkAuth(context); 
            try{
                const post =await Post.findById(postId)
                  const indx = post.comments.findIndex(c => c.id === commentId);
                  if(indx!== -1){
                      if(post.comments[indx].username === username){
                          post.comments.splice(indx,1);
                          post.save();
                          return post;
                      }
                      throw new AuthenticationError('Permission Denied')
                  }
            }
            catch(err){
                throw new UserInputError("No Content", {
                    errors: {
                      body: "comment content is required",
                    },
                  });
                
            }

        }
    }
}