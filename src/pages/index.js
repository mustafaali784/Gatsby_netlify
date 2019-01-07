import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout';
const IndexPage = () => {

  return (
    <Layout>
      <div>
        <center>
          <h1>Welcome </h1>
          <br /><br />
          <div >
            <ul>
              <li><Link className="site-link" to="/gallery" >Show Gallery</Link></li>
              <li><Link className="site-link" to="/pages">Show Pages</Link> </li>
              <li><Link className="site-link" to="/posts">Show Posts</Link></li> </ul>
          </div>
        </center></div>
    </Layout>
  )
}

export default IndexPage;
