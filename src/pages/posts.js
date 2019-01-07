import React from 'react';
import AllPosts from '../components/Posts'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

const Posts = ({data}) => {    
  var i = 0
  console.log(data.allService.edges , "ids")
  i++;
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