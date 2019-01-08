import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby';
import React from 'react'

const Header = (props) => (
  <StaticQuery
    query={graphql`
  {
    allService{
      edges{
        node{
          id
          title
        }
      }
    }
    allPages{
      edges{
        node{
          id
          title
        }
      }
    }
    allPosts{
      edges{
        node{
          id
          title
        }
      }
    }
    }`}
    render={data => {
      const gallery = data.allPosts.edges;
      const posts = data.allService.edges
      const pages = data.allPages.edges
      return (
        <div className={`navbar`}>
        <Link to ='/'>Home</Link>
        <div className="dropdown">
            <button className="dropbtn">Pages
    </button>
            <div className="dropdown-content">
            {
                pages.map(({ node }) => {
                  return (
                    <Link to={`singlePage/${node.id}`}>{node.title}</Link>
                  )
                })
              }
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Posts
    </button>
            <div className="dropdown-content">
              {
                posts.map(({ node }) => {
                  return (
                    <Link to={`singlePost/${node.id}`}>{node.title}</Link>
                  )
                })
              }
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Gallery
    </button>
            <div className="dropdown-content">
              {
                gallery.map(({ node }) => {
                  return (
                    <Link to={`singlegallery/${node.id}`}>{node.title}</Link>
                  )
                })
              }
            </div>
          </div>          
        </div>
      )
    }}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
