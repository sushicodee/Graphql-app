import React , {useState} from'react'
import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST,FETCH_POSTS_QUERY } from '../../../graphql/graphql';
import { Button, Confirm, Icon } from 'semantic-ui-react';

function DeleteButton({postId}) {
  const [confOpen, setconfOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST , {
    update(proxy){
        const data = proxy.readQuery({query:FETCH_POSTS_QUERY})
        data.getPosts = data.getPosts.filter(p=> p.id!==postId)
        proxy.writeQuery({query:FETCH_POSTS_QUERY,data})
        setconfOpen(false);
    },
    variables:{
        postId
    }
  })
    return (
            <>
            <Button as= 'div' color="red" floated='right' onClick={() => setconfOpen(true)}>
              <Icon name="trash" />
            </Button>
            <Confirm
            open = {confOpen}
            onCancel = {() => setconfOpen(false)}
            onConfirm = {deletePost}>
            </Confirm>
            </>
    )
}

export default DeleteButton
