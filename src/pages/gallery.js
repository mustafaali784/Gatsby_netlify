import React from 'react';
import Home from '../components/Home'
import Layout from '../components/layout';
import { graphql } from 'gatsby'

const Gallery = ({ data }) => {
  return (
    <Layout>
      <Home data={data.allWordpressWpGallery.edges} />
    </Layout>
  )
}

export default Gallery;

export const allPosts = graphql`
{
  allWordpressWpGallery{
  edges{
    node{
      id
      title
    }
  }
}
}
`;