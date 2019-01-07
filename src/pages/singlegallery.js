import React from 'react';
import SingleGalleryComponent from '../components/SingleGalleryComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

const SingleGallery = ({ data }) => {
    return (
        <Layout>
        <SingleGalleryComponent data={data.allPosts.edges} />
        </Layout>
    )
}

export default SingleGallery;

export const allPosts = graphql`
{
allPosts{
  edges{
    node{
      id
      title
      image
      content
    }
  }
}
}
`;