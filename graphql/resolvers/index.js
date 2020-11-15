const postResolvers = require('./post.resolvers');
const userResolvers = require('./user.resolvers');
const commentResolvers = require('./comment.resolvers');
const likeResolvers = require('./like.resolvers');


module.exports = {
    Post:{
        likeCount:(parent) => parent.likes.length,
        commentCount:(parent) => parent.comments.length
    },
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation,
    },
    Subscription:{
        ...postResolvers.Subscription
    }
}