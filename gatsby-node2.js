const path = require(`path`);


exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    // const PagesPath = path.resolve('src/pages/singlePage.js');
    const PostsPath = path.resolve('src/pages/singlePost.js');
    const GalleryPath = path.resolve('src/pages/singlegallery.js');


    const posts = graphql(`
                {
                    allService {
                      edges {
                        node {
                          id
                          slug
                        }
                      }
                    }
                    allPosts {
                        edges {
                          node {
                            id
                            slug
                          }
                        }
                      }
                }`
    ).then(result => {
        console.log("Services", result)
        if (result.errors) {
            Promise.reject(result.errors)
        } else {
            result.data.allService.edges.forEach(({ node }) => {
                createPage({
                    path: `Post/${node.slug}`,
                    component: PostsPath,
                    context: {
                        postId: node.id
                    },
                })
            })
            result.data.allPosts.edges.forEach(({ node }) => {
                createPage({
                    path: `Gallery/${node.slug}`,
                    component: GalleryPath,
                    context: {
                        id: node.id
                    },
                })
            })
        }
    })

    return Promise.all([posts]);
}