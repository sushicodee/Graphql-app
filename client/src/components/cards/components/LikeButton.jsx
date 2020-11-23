import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST } from "../../../graphql/graphql";
import './LikeButton.scss';

function LikeButton({user, post: {id,likeCount,likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user,likes]);

  const [likePost] = useMutation(LIKE_POST,{
      variables:{ postId : id }
  })

  function handleLikePost(){
      likePost();
  }

  const likeButton = user ? (
    <Button as="div" labelPosition="right">
      {liked ? (
          <>
        <Button color="red"  onClick={handleLikePost}>
        <Icon name="heart" />
      </Button>
      <Label as="a" color="red" pointing="left">
        {likeCount}
      </Label>
      </>
      ):
      (
        <>
        <Button color="red" basic onClick={handleLikePost}>
        <Icon name="heart" />
      </Button>
      <Label as="a" color="red" pointing="left">
        {likeCount}
      </Label>
      </>
      )}
      </Button>
  ):(
    <>
    <Button as ={Link} to = '/login' color="red" basic>
    <Icon name="heart" />
  </Button>
  </>
  )

  return likeButton;
}



export default LikeButton;