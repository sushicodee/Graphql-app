import { useMutation } from '@apollo/react-hooks';
import React from 'react'
import { Button, Container, Input } from 'semantic-ui-react';
import { CREATE_COMMENT } from '../../../graphql/graphql';
import { useForm } from '../../../utils/hooks/useForm';

function CommentForm({postId}) {

    const { values, onChange, onSubmit } = useForm(postCommentCallback, {
        postId,
        body: "",
      });
    
      const [createComment] = useMutation(CREATE_COMMENT , {
        variables:values,
        onError(err){
        },
        update(_,results){
          values.body = '';
        }
      })
    
      function postCommentCallback() {
        createComment();
      }
    return (
        <Container className="comment-container">
        <Input
          name = 'body'
          placeholder="Add a comment"
          value={values.body}
          onChange={onChange}
        ></Input>
        <Button onClick={onSubmit}>POST</Button>
      </Container>
    )
}

export default CommentForm
