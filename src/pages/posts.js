import React from 'react';
import AllPosts from '../components/Posts'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

const Posts = ({data}) => {    
 
    return(
        <Layout>
            <AllPosts data={data.allWordpressWpService.edges} />
        </Layout>
    )
}
export default Posts;


export const allService = graphql`
{
  allWordpressWpService{
  edges{
    node{
      id
      title
    }
  }
}
}
`;