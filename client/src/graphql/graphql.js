import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const DELETE_POST = gql`
mutation deletePost($postId:ID!) {
    deletePost(postId:$postId)
}
`

export const CREATE_COMMENT = gql`
mutation createComment($postId:ID!,$body:String!){
  createComment(postId:$postId,body:$body){
    id
    comments{
      id
      body
      username
      createdAt
    }
    commentCount
  }
}
`

export const DELETE_COMMENT = gql`
mutation deleteComment($postId:ID!,$commentId:ID!){
  deleteComment(postId:$postId,commentId:$commentId){
    id
    comments{
      id
      username
      body
      createdAt
    }
    commentCount
  }
}
`

export const LIKE_POST = gql`
mutation likePost($postId:ID!) {
    likePost(postId:$postId){
        id,
        likes {
            id 
            username
            createdAt
        }
        likeCount
    }
}
`