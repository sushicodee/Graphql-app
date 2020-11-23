import React, { useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import "./CommentsList.scss";
function CommentsList({ comments, commentCount }) {
  const [show, setshow] = useState(false);
  const commentsListClass = `comments comments${show ? "-show" : "-hidden"}`;
  const toggleComments = () => {
    setshow((pre) => !pre);
  };
  return (
    <>
      {commentCount !== 0 && (
          <Button as="div" labelPosition="right"  className="comment-controls-container">
            <Button color="blue" basic onClick={toggleComments}>
              <Icon name="comment" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
      )}
      <div className={commentsListClass}>
        {comments &&
          comments.map((comment) => <li key={comment.id}>{comment.body}</li>)}
      </div>
    </>
  );
}

export default CommentsList;
