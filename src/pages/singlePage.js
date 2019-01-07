import React from 'react';
import SinglePageComponent from '../components/SinglePageComponent'
import Layout from '../components/layout'
import { graphql } from 'gatsby';

const SinglePage = ({ data }) => {
    return (
        <Layout>
        <SinglePageComponent data={data.allPages.edges} />
        </Layout>
    )
}

export default SinglePage;

export const allPages = graphql`
{
allPages{
  edges{
    node{
      id
      title
      content
    }
  }
}
}
`;