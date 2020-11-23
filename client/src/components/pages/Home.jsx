import React , {useContext} from "react";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../cards/PostCard";
import './Home.scss';
import {AuthContext} from '../../context/auth';
import PostFormCard from "../cards/components/PostFormCard";
import {FETCH_POSTS_QUERY} from '../../graphql/graphql';
import {Transition} from 'semantic-ui-react';

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const {user} = useContext(AuthContext);
  return(
     <div className = 'container'>
        {user &&
          <div className = 'post-form-container'>
            <PostFormCard/>
          </div>
        }
         <h2>
         Recent Posts
         </h2>
         <div className = 'posts-container'>
            {loading ? (
                <h1> Loading ...</h1>
            ):
            <div>
              {data?.getPosts && data.getPosts.map(post => (
                <Transition.Group>
                  <PostCard key = {post.id} post = {post}/>
                </Transition.Group>
            ))}
            </div>
            }
         </div>
     </div>
  )
}

export default Home;
