import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "./../../context/auth";
import "./PostCard.scss";
import LikeButton from "./components/LikeButton";
import CommentsList from "./components/CommentsList";
import CommentForm from "./components/CommentForm";
import DeleteButton from "./components/DeleteButton";

function PostCard({
  post: {
    id,
    body,
    createdAt,
    username,
    likes,
    likeCount,
    comments,
    commentCount,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid className={"post-card"}>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow().toUpperCase()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likeCount, likes }} />
        {user?.username && user.username === username ? (
          <DeleteButton postId={id} />
        ) : (
          ""
        )}
        <CommentsList comments={comments} commentCount={commentCount} />
        <CommentForm user={user} postId={id} />
      </Card.Content>
    </Card>
  );
}

export default PostCard;
