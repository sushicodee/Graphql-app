const {gql} = require('apollo-server');

module.exports = gql`
    type Comment{
        id:ID!
        body:String!
        username:String!
        createdAt:String!
    }
    type Likes{
        id:ID!
        createdAt:String!
        username:String!
    }
    type Post{
        id:ID!
        body:String! 
        username:String!  
        createdAt:String!
        comments:[Comment]!
        likes:[Likes]!
        likeCount:Int!
        commentCount:Int!
    }
    type User{
        id:ID!
        email:String!
        accessToken:String
        refreshToken:String
        username:String!
        createdAt:String!
    }
    input RegisterInput{
        username:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Query{
        getPosts:[Post]
        getPost(postId:ID!):Post
    }
    type Tokens{
        accessToken:String!
        refreshToken:String!
    }
    type Mutation{
        register(registerInput:RegisterInput!):User!
        login(username:String!,password:String!):User!
        renewToken(refreshToken:String!):Tokens!
        createPost(body:String!):Post!
        deletePost(postId:ID!):String!
        createComment(postId:ID!,body:String!):Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        likePost(postId:ID!):Post!
    }
    type Subscription{
        newPost:Post!
    }
`