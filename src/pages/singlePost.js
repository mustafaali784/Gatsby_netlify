import React from 'react';
import SinglePostComponent from '../components/SinglePostComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby';

const SinglePost = ({ data }) => {
  console.log(data, "mustafa ali")
  return (
    <Layout>
      <SinglePostComponent data={data.service} />
    </Layout>
  )
}

export default SinglePost;


export const query = graphql`
  query singlePost($postId: String!) {
    service(id: { eq: $postId }) {
      id
      title
      image
      content
    }
  }
`