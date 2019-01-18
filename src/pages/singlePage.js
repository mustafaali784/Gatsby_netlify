import React from 'react';
import SinglePageComponent from '../components/SinglePageComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import SEO from '../components/seo';

const SinglePage = ({ data }) => {
  console.log(data , "Posts")
  return (
    <Layout>
      <SEO title = 'Pages' />
      <SinglePageComponent data={data.wordpressPage} />
    </Layout>
  )
}

export default SinglePage;

// export const allPages = graphql`
// {
// allPages{
//   edges{
//     node{
//       id
//       title
//       content
//     }
//   }
// }
// }
// `;

export const query = graphql`
query singlePage($id: String) {
  wordpressPage(id: { eq: $id }) {
    id
    title
    content
  }
}
`