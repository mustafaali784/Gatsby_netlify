import React from 'react';
import SinglePostComponent from '../components/SinglePostComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby';

const SinglePost = ({ data }) => {
    return (
        <Layout>
        <SinglePostComponent data={data.allService.edges} />
        </Layout>
    )
}

export default SinglePost;

export const allService = graphql`
{
allService{
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