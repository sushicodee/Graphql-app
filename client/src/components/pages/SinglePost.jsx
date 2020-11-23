import React , {useContext} from "react";
import gql from "graphql-tag";
import {useQuery } from '@apollo/react-hooks';
import { Card, Grid, Loader, Image } from "semantic-ui-react";
import LikeButton from "../cards/components/LikeButton";
import moment from 'moment';
import { AuthContext } from "../../context/auth";
function SinglePost(props) {
  const {user} = useContext(AuthContext);
  const postId = props.match.params.postId;
    const {data} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postId
        }
    })
  let postMarkup;
      if(!data?.getPost){
          postMarkup = <Loader/>
      }
      else{
          const {id,body,createdAt,username,comments,likes,likeCount,commentCount} = data.getPost;
            postMarkup = 
            (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width = {2}>
                    <Image
                        floated="right"
                        size="small"
                        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
                        </Grid.Column>
                        <Grid.Column width = {10}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>
                                        {username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(createdAt).fromNow().toUpperCase()}
                                    </Card.Meta>
                                    <Card.Description>
                                        {body}
                                    </Card.Description>
                                    <Card.Content extra>
                                        <LikeButton user = {user} post = {{id,likeCount,likes}}/>
                                    </Card.Content>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )

      }
  return postMarkup;
}
const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      likeCount
      commentCount
      username
      likes {
        id
        createdAt
        username
      }
      comments {
        id
        createdAt
        username
      }
    }
  }
`;

export default SinglePost;
