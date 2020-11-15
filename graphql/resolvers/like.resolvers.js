const Post = require("../../models/posts.model");
const checkAuth = require("../../middlewares/checkAuth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
    Query:{

    },
    Mutation:{
        async likePost(_,{postId},context){
            const {username} = checkAuth(context);
            const post =await  Post.findById(postId);
            if(post){
                if(post.likes.find(like => like.username === username)){
                    //unlike
                    console.log('unlike')
                    post.likes = post.likes.filter(like => like.username!== username);
                }else{
                    // like
                    post.likes.push({
                        username,
                        createdAt:new Date()
                    })
                }
                await post.save();
                return post;
            }
            throw new UserInputError('Post not found')

        }
    }
}