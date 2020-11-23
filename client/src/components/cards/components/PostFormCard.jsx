import "./PostFormCard.scss";
import { Form } from "semantic-ui-react";
import { useForm } from "../../../utils/hooks/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {Button} from 'semantic-ui-react';
import {FETCH_POSTS_QUERY} from '../../../graphql/graphql';
import './PostFormCard.scss';

function PostFormCard() {
  const { values, onChange,onSubmit} = useForm(onSubmitCallback, { body: "" });
    const [createPost, {error}] = useMutation(CREATE_POST,{
        variables:values,
        update(proxy,result){
            const data = proxy.readQuery({
                query:FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({query:FETCH_POSTS_QUERY,data})
            values.body = '';
        },
        onError(err){

        },
    })
  function onSubmitCallback(){
    createPost();
  };
  return (
    <>
    <Form onSubmit={onSubmit} noValidate>
      <h3>Create a Post</h3>
      <Form.Field className = 'ui action input'>
        <Form.Input error={error ? true : false} placeholder="Add a post ..." name="body" value={values.body} onChange = {onChange}>
        </Form.Input>
        <Button type = 'submit' color = 'teal'>Post</Button>
      </Form.Field>
    </Form>
    {error && (
        <div className = 'ui error message'>
            <ul className = 'list'>
                <li>{error.graphQLErrors[0].message}</li>
            </ul>
        </div>
    )
    }
    </>
  )
}
const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
        username
        createdAt
      }
    }
  }
`;

export default PostFormCard;
