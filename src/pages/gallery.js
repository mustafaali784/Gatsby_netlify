import React from 'react';
import Home from '../components/Home'
import Layout from '../components/layout';
import { graphql } from 'gatsby'

const Gallery = ({data}) => {    
    return(
        <Layout>
        <Home data={data.allPosts.edges} />
        </Layout>
    )
}

export default Gallery;

export const allPosts = graphql`
{
allPosts{
  edges{
    node{
      id
      title
    }
  }
}
}
`;