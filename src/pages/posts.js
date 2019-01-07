import React from 'react';
import AllPosts from '../components/Posts'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

const Posts = ({data}) => {    
    return(
        <Layout>
            <AllPosts data={data.allService.edges} />
        </Layout>
    )
}
export default Posts;


export const allPosts = graphql`
{
allService{
  edges{
    node{
      id
      title
    }
  }
}
}
`;