import React from 'react'
import Layout from '../components/layout';
import renderHTML from 'react-render-html'
import image from '../images/bg_world_bottom.png'



const IndexPage = ({ data }) => {
  const AllData = data.allPages.edges;
  let singleData;
  AllData.map(({ node }) => {
    if (node.id == 954) {
      singleData = node;
    }
  })

  return (
    <div>
    <Layout className = 'sticky'/>
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
allPages{
  edges{
    node{
      id
      title
      content
    }
  }
}
}`