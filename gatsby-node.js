/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require('axios');
const crypto = require('crypto');
const _ = require('lodash');
const path = require(`path`);

// exports.sourceNodes = async ({ actions }) => {

exports.sourceNodes = ({ actions }) => {
    const { createNode } = actions;

    return new Promise((resolve, reject) => {
        axios.get(`https://pwa.siplsolutions.com/wp/wp-json/wp/v2/gallery?&_embed`).then(res => {

            // map into these results and create nodes
            res.data.map((el, i) => {
                // Create your node object
                const userNode = {
                    // Required fields
                    id: `${i}`,
                    parent: `__SOURCE__`,
                    internal: {
                        type: `Posts`, // name of the graphQL query --> allPosts {}
                        // contentDigest will be added just after
                        // but it is required
                    },
                    children: [],

                    // Other fields that you want to query with graphQl
                    id: el.id + '',
                    title: el.title.rendered,
                    content: el.content.rendered,
                    slug: el.slug,
                    image: el._embedded["wp:featuredmedia"][0].source_url,
                }

                // Get content digest of node. (Required field)
                const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(userNode)).digest(`hex`);
                // add it to userNode
                userNode.internal.contentDigest = contentDigest;

                // Create node with the gatsby createNode() API
                createNode(userNode);
            });
            resolve();
        }).catch(err => {
            console.log(err, "catch")
        });

        axios.get(`https://pwa.siplsolutions.com/wp/wp-json/wp/v2/service?_embed`).then(res => {
            // map into these results and create nodes
            _.map(res.data, (el, i) => {
                // Create your node object
                const userNode = {
                    // Required fields
                    id: `${i}`,
                    parent: `__SOURCE__`,
                    internal: {
                        type: `Service`, // name of the graphQL query --> allPosts {}
                        // contentDigest will be added just after
                        // but it is required
                    },
                    children: [],

                    // Other fields that you want to query with graphQl
                    id: el.id + '',
                    title: el.title.rendered,
                    content: el.content.rendered,
                    slug: el.slug,
                    image: "https://pwa.siplsolutions.com/wp/wp-content/uploads/2018/06/innnnnn.jpg"
                    // image: el._embedded["wp:featuredmedia"][0].source_url,
                }
                // Get content digest of node. (Required field)
                const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(userNode)).digest(`hex`);
                // add it to userNode
                userNode.internal.contentDigest = contentDigest;
                // Create node with the gatsby createNode() API
                createNode(userNode);
            });
            resolve();
        }).catch(err => {
            console.log(err, "catch")
        });

        axios.get(`https://pwa.siplsolutions.com/wp/wp-json/wp/v2/pages`).then(res => {

            // map into these results and create nodes
            res.data.map((el, i) => {
                // Create your node object
                const userNode = {
                    // Required fields
                    id: `${i}`,
                    parent: `__SOURCE__`,
                    internal: {
                        type: `Pages`, // name of the graphQL query --> allPages {}
                        // contentDigest will be added just after
                        // but it is required
                    },
                    children: [],

                    // Other fields that you want to query with graphQl
                    id: el.id + '',
                    title: el.title.rendered,
                    content: el.content.rendered,
                    slug: el.slug,
                }

                // Get content digest of node. (Required field)
                const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(userNode)).digest(`hex`);
                // add it to userNode
                userNode.internal.contentDigest = contentDigest;

                // Create node with the gatsby createNode() API
                createNode(userNode);
            });
            resolve();
        }).catch(err => {
            console.log(err, "catch")
        });

    });
}


// exports.createPages = ({ graphql, actions }) => {
//     const { createPage } = actions
//     return new Promise((resolve, reject) => {
//         graphql(`
//         {
//             allService {
//               edges {
//                 node {
//                   id
//                   slug
//                 }
//               }
//             }
//               allPages {
//                 edges {
//                   node {
//                     id
//                   }
//                 }
//               }
//           }
//       `).then(result => {
//             if (result.errors) {
//                 console.log(result.errors, "error");
//                 Promise.reject(result.errors)
//             }
//             if (result.data) {
//                 console.log("Result", result.data);
//                 if (result.data.allService) {
//                     result.data.allService.edges.forEach(({ node }) => {
//                         createPage({
//                             path: `Post/${node.slug}`,
//                             component: path.resolve(`./src/pages/singlePost.js`),
//                             context: {
//                                 postId: node.id
//                             },
//                         })
//                         resolve()
//                     })
//                 }
//                 // if (result.data.allPosts) {
//                 //     result.data.allPosts.edges.forEach(({ node }) => {
//                 //         // console.log("         posts", node);
//                 //         createPage({
//                 //             path: `Gallery/${node.slug}`,
//                 //             component: path.resolve(`./src/pages/singlegallery.js`),
//                 //             context: {
//                 //                 id: node.id
//                 //             },
//                 //         })
//                 //         resolve()
//                 //     })
//                 // }
//                 if (result.data.allPages) {
//                     result.data.allPages.edges.forEach(({ node }) => {
//                         // console.log("         pages", node);
//                         createPage({
//                             path: `Page/${node.slug}`,
//                             component: path.resolve(`./src/pages/singlePage.js`),
//                             context: {
//                                 id: node.id
//                             },
//                         })
//                         resolve()
//                     })
//                 }
//             }
//             // resolve();


//         })

//     }).catch(error => {
//         console.log(error)
//         reject()
//     })
// };

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const PagesPath = path.resolve('src/pages/singlePage.js');
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
                }`
    ).then(result => {
        console.log("Services", result)
        if (result.errors) {
            Promise.reject(result.errors)
        }
        result.data.allService.edges.forEach(({ node }) => {
            createPage({
                path: `Post/${node.slug}`,
                component: PostsPath,
                context: {
                    postId: node.id
                },
            })
        })
    })

    const gallery = graphql(`
        {
             allPosts {
                 edges {
                   node {
                     id
                     slug
                   }
                 }
               }
            }
        `).then(result => {
        console.log("posts", result)
        if (result.errors) {
            Promise.reject(result.errors)
        }

        result.data.allPosts.edges.forEach(({ node }) => {
            createPage({
                path: `Gallery/${node.slug}`,
                component: GalleryPath,
                context: {
                    id: node.id
                },
            })
        })
    })

    // const page = graphql(`
    // {
    //     allPages {
    //         edges {
    //             node {
    //                 id
    //                 slug
    //             }
    //          }
    //       }
    //  }`
    // ).then(result => {
    //     console.log("pages", result)
    //     if (result.errors) {
    //         Promise.reject(result.errors)
    //     }
    //     result.data.allPages.edges.forEach(({ node }) => {
    //         createPage({
    //             path: `Page/${node.slug}`,
    //             path: PagesPath,
    //             context: {
    //                 id: node.id
    //             }
    //         })
    //     })
    // })
    return Promise.all([gallery, posts]);
}

// exports.onCreatePage = ({ page }) => {
//     console.log(page, "Page");
// }
// allPosts {
//     edges {
//       node {
//         id
//       }
//     }
//   }
//   allPages {
//     edges {
//       node {
//         id
//       }
//     }
//   }



// allPosts {   
//     edges {
//       node {
//         id
//         slug
//       }
//     }
//   }
//   allPages {
//     edges {
//       node {
//         id
//         slug
//       }
//     }
//   }