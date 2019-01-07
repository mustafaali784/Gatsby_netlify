import React from 'react';
import Pages from '../components/Pages'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
const pages = ({data}) => {    
    return(
        <Layout>
            <Pages data={data.allPages.edges} />
        </Layout>
    )
}
export default pages;


export const allPosts = graphql`
{
allPages{
  edges{
    node{
      id
      title
    }
  }
}
}
`;