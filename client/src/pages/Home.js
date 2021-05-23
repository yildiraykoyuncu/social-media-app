import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, Image } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;

const Home = () => {
  const {
    loading,
    error,
    data
  } = useQuery(FETCH_POSTS_QUERY);


  return (
    <Grid columns={3} >
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => {
           return ( <Grid.Column key={post.id} style={{marginTop: "10px"}}>
              <PostCard post={post} />
            </Grid.Column>)
          })
        )}
      </Grid.Row>
    </Grid>
    
  );
};

export default Home;
