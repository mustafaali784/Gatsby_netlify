import React from 'react';
import SingleGalleryComponent from '../components/SingleGalleryComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import SEO from '../components/seo';

const SingleGallery = ({ data }) => {
  console.log(data  , "gallery")
  return (
    <Layout>
      <SEO title='Gallery' />
      <SingleGalleryComponent data={data.wordpressWpGallery} />
    </Layout>
  )
}

export default SingleGallery;

// export const allPosts = graphql`
// {
// allPosts{
//   edges{
//     node{
//       id
//       title
//       image
//       content
//     }
//   }
// }
// }
// `;
export const query = graphql`
query allPosts($id: String) {
  wordpressWpGallery(id: { eq: $id }) {
    id
    title
    content
  }
}
`