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
          slug
        }
      }
    }
    allPages{
      edges{
        node{
          id
          title
          slug
        }
      }
    }
    allPosts{
      edges{
        node{
          id
          title
          slug
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
          <Link to='/'>Home</Link>
          <div className="dropdown">
            <button className="dropbtn">Pages
    </button>
            <div className="dropdown-content">
              {
                pages.map(({ node }) => {
                  return (
                    <Link to={`Page/${node.slug}`} key={node.id}>{node.title}</Link>
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
                    <Link to={`Post/${node.slug}`} key={node.id}>{node.title}</Link>
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
                    <Link to={`Gallery/${node.slug}`} key={node.id}>{node.title}</Link>
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
