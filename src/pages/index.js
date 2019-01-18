import React from 'react'
import Layout from '../components/layout';
import renderHTML from 'react-render-html'
import image from '../images/bg_world_bottom.png'
import SEO from '../components/seo';
import {graphql} from 'gatsby'


const IndexPage = ({ data }) => {
  const AllData = data.allWordpressPage.edges;
  let singleData;
  AllData.map(({ node }) => {
    if (node.id == "9aefda7f-5939-5281-a6fb-b39adaa45305") {
      singleData = node;
    }
  })

  return (
    <div>
      <SEO title = 'Home' />
    <Layout className = 'sticky'><div/></Layout>
        <div className="image-container">
          <img src={image} style ={{position : "fixed", zIndex : "-1"}}/>
      </div>
      <div style = {{backgroundColor : "white" , marginTop : 650}}> 
        <br />
        <div>
          {renderHTML(singleData.content)}
        </div>
      </div>
      </div>
  )
}

export default IndexPage;

export const HomePage = graphql`
{
  allWordpressPage{
  edges{
    node{
      id
      title
      content
    }
  }
}
}`