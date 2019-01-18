import React from 'react';
import SinglePostComponent from '../components/SinglePostComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby';
import SEO from '../components/seo';

const SinglePost = ({ data }) => {
  return (
    <Layout>
      <SEO title = 'Posts'/>
      <SinglePostComponent data={data.wordpressWpService} />
    </Layout>
  )
}

export default SinglePost;


export const query = graphql`
  query singlePost($postId: String) {
    wordpressWpService(id: { eq: $postId }) {
      id
      title
      content
    }
  }
`