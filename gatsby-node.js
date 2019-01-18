// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// // You can delete this file if you're not using it

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    const PagesPath = path.resolve('src/pages/singlePage.js');
    const PostsPath = path.resolve('src/pages/singlePost.js');
    const GalleryPath = path.resolve('src/pages/singlegallery.js');
    return new Promise((resolve, reject) => {
        // The “graphql” function allows us to run arbitrary
        // queries against the local WordPress graphql schema. Think of
        // it like the site has a built-in database constructed
        // from the fetched data that you can run queries against.

        // ==== PAGES (WORDPRESS NATIVE) ====
        graphql(
            `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `
        )
            .then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                // Create Page pages.
                // We want to create a detailed page for each
                // page node. We'll just use the WordPress Slug for the slug.
                // The Page ID is prefixed with 'PAGE_'
                _.each(result.data.allWordpressPage.edges, edge => {
                    // Gatsby uses Redux to manage its internal state.
                    // Plugins and sites can use functions like "createPage"
                    // to interact with Gatsby.
                    createPage({
                        // Each page is required to have a `path` as well
                        // as a template component. The `context` is
                        // optional but is often necessary so the template
                        // can query data specific to each page.
                        path: `Page/${edge.node.slug}/`,
                        component: slash(PagesPath),
                        context: {
                            id: edge.node.id,
                        },
                    })
                })
            })
            // ==== END PAGES ====

            // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
            .then(() => {
                graphql(
                    `
            {
                allWordpressWpService {
                edges {
                  node {
                    id
                    slug
                  }
                }
              }
            }
          `
                ).then(result => {
                    if (result.errors) {
                        console.log(result.errors)
                        reject(result.errors)
                    }
                    // We want to create a detailed page for each
                    // post node. We'll just use the WordPress Slug for the slug.
                    // The Post ID is prefixed with 'POST_'
                    _.each(result.data.allWordpressWpService.edges, edge => {
                        console.log(edge.node)
                        createPage({
                            path: `Post/${edge.node.slug}/`,
                            component: PostsPath,
                            context: {
                                id: edge.node.id,
                            },
                        })
                    })
                }).then(() => {
                    graphql(
                        `
                        {
                            allWordpressWpGallery {
                                edges {
                                    node {
                                        id
                                        slug
                                    }
                                }
                            }
                        }
                        `).then(result => {
                            if (result.errors) {
                                console.log(result.errors)
                                reject(result.errors)
                            }
                            _.each(result.data.allWordpressWpGallery.edges, edge => {
                                createPage({
                                    path: `Gallery/${edge.node.slug}/`,
                                    component: slash(GalleryPath),
                                    context: {
                                        id: edge.node.id,
                                    },
                                })
                            })
                        })
                    resolve()
                })
            })
        // ==== END POSTS ====
    })
}






































// const axios = require('axios');
// const crypto = require('crypto');
// const _ = require('lodash');
// const path = require(`path`);

// // exports.sourceNodes = async ({ actions }) => {

// exports.sourceNodes = ({ actions }) => {
//     const { createNode } = actions;

//     return new Promise((resolve, reject) => {
//         axios.get(`https://pwa.siplsolutions.com/wp/wp-json/wp/v2/gallery?&_embed`).then(res => {

//             // map into these results and create nodes
//             res.data.map((el, i) => {
//                 // Create your node object
//                 const userNode = {
//                     // Required fields
//                     id: `${i}`,
//                     parent: `__SOURCE__`,
//                     internal: {
//                         type: `Posts`, // name of the graphQL query --> allPosts {}
//                         // contentDigest will be added just after
//                         // but it is required
//                     },
//                     children: [],

//                     // Other fields that you want to query with graphQl
//                     id: el.id + '',
//                     title: el.title.rendered,
//                     content: el.content.rendered,
//                     slug: el.slug,
//                     image: el._embedded["wp:featuredmedia"][0].source_url,
//                 }

//                 // Get content digest of node. (Required field)
//                 const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(userNode)).digest(`hex`);
//                 // add it to userNode
//                 userNode.internal.contentDigest = contentDigest;

//                 // Create node with the gatsby createNode() API
//                 createNode(userNode);
//             });
//             resolve();
//         }).catch(err => {
//             console.log(err, "catch")
//         });

//         axios.get(`https://pwa.siplsolutions.com/wp/wp-json/wp/v2/service?_embed`).then(res => {
//             // map into these results and create nodes
//             _.map(res.data, (el, i) => {
//                 // Create your node object
//                 const userNode = {
//                     // Required fields
//                     id: `${i}`,
//                     parent: `__SOURCE__`,
//                     internal: {
//                         type: `Service`, // name of the graphQL query --> allPosts {}
//                         // contentDigest will be added just after
//                         // but it is required
//                     },
//                     children: [],

//                     // Other fields that you want to query with graphQl
//                     id: el.id + '',
//                     title: el.title.rendered,
//                     content: el.content.rendered,
//                     slug: el.slug,
//                     image: "https://pwa.siplsolutions.com/wp/wp-content/uploads/2018/06/innnnnn.jpg"
//                     // image: el._embedded["wp:featuredmedia"][0].source_url,
//                 }
//                 // Get content digest of node. (Required field)
//                 const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(userNode)).digest(`hex`);
//                 // add it to userNode
//                 userNode.internal.contentDigest = contentDigest;
//                 // Create node with the gatsby createNode() API
//                 createNode(userNode);
//             });
//             resolve();
//         }).catch(err => {
//             console.log(err, "catch")
//         });

//         axios.get(`https://pwa.siplsolutions.com/wp/wp-json/wp/v2/pages`).then(res => {

//             // map into these results and create nodes
//             res.data.map((el, i) => {
//                 // Create your node object
//                 const userNode = {
//                     // Required fields
//                     id: `${i}`,
//                     parent: `__SOURCE__`,
//                     internal: {
//                         type: `Pages`, // name of the graphQL query --> allPages {}
//                         // contentDigest will be added just after
//                         // but it is required
//                     },
//                     children: [],

//                     // Other fields that you want to query with graphQl
//                     id: el.id + '',
//                     title: el.title.rendered,
//                     content: el.content.rendered,
//                     slug: el.slug,
//                 }

//                 // Get content digest of node. (Required field)
//                 const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(userNode)).digest(`hex`);
//                 // add it to userNode
//                 userNode.internal.contentDigest = contentDigest;

//                 // Create node with the gatsby createNode() API
//                 createNode(userNode);
//             });
//             resolve();
//         }).catch(err => {
//             console.log(err, "catch")
//         });

//     });
// }

// exports.createPages = ({ graphql, actions }) => {
//     const { createPage } = actions;
//     // const PagesPath = path.resolve('src/pages/singlePage.js');
//     const PostsPath = path.resolve('src/pages/singlePost.js');
//     const GalleryPath = path.resolve('src/pages/singlegallery.js');


//     const posts = graphql(`
//                 {
//                     allService {
//                       edges {
//                         node {
//                           id
//                           slug
//                         }
//                       }
//                     }
//                     allPosts {
//                         edges {
//                           node {
//                             id
//                             slug
//                           }
//                         }
//                       }
//                 }`
//     ).then(result => {
//         console.log("Services", result)
//         if (result.errors) {
//             Promise.reject(result.errors)
//         }
//         result.data.allService.edges.forEach(({ node }) => {
//             createPage({
//                 path: `Post/${node.slug}`,
//                 component: PostsPath,
//                 context: {
//                     postId: node.id
//                 },
//             })
//         })

//         result.data.allPosts.edges.forEach(({ node }) => {
//             createPage({
//                 path: `Gallery/${node.slug}`,
//                 component: GalleryPath,
//                 context: {
//                     id: node.id
//                 },
//             })
//         })
//     })

// //     // const gallery = graphql(`
// //     //     {
// //     //          allPosts {
// //     //              edges {
// //     //                node {
// //     //                  id
// //     //                  slug
// //     //                }
// //     //              }
// //     //            }
// //     //         }
// //     //     `).then(result => {
// //     //     console.log("posts", result)
// //     //     if (result.errors) {
// //     //         Promise.reject(result.errors)
// //     //     }

// //     //     result.data.allPosts.edges.forEach(({ node }) => {
// //     //         createPage({
// //     //             path: `Gallery/${node.slug}`,
// //     //             component: GalleryPath,
// //     //             context: {
// //     //                 id: node.id
// //     //             },
// //     //         })
// //     //     })
// //     // })

// //     const page = graphql(`
// //     {
// //         allPages {
// //             edges {
// //                 node {
// //                     id
// //                     slug
// //                 }
// //              }
// //           }
// //      }`
// //     ).then(result => {
// //         console.log("pages", result)
// //         if (result.errors) {
// //             Promise.reject(result.errors)
// //         }
// //         result.data.allPages.edges.forEach(({ node }) => {
// //             createPage({
// //                 path: `Page/${node.slug}`,
// //                 path: PagesPath,
// //                 context: {
// //                     id: node.id
// //                 }
// //             })
// //         })
// //     })
//     return Promise.all([posts ]);
// }













// // exports.createPages = ({ graphql, actions }) => {
// //     const { createPage } = actions
// //     return new Promise((resolve, reject) => {
// //         graphql(`
// //         {
// //             allService {
// //               edges {
// //                 node {
// //                   id
// //                   slug
// //                 }
// //               }
// //             }
// //               allPages {
// //                 edges {
// //                   node {
// //                     id
// //                   }
// //                 }
// //               }
// //           }
// //       `).then(result => {
// //             if (result.errors) {
// //                 console.log(result.errors, "error");
// //                 Promise.reject(result.errors)
// //             }
// //             if (result.data) {
// //                 console.log("Result", result.data);
// //                 if (result.data.allService) {
// //                     result.data.allService.edges.forEach(({ node }) => {
// //                         createPage({
// //                             path: `Post/${node.slug}`,
// //                             component: path.resolve(`./src/pages/singlePost.js`),
// //                             context: {
// //                                 postId: node.id
// //                             },
// //                         })
// //                         resolve()
// //                     })
// //                 }
// //                 // if (result.data.allPosts) {
// //                 //     result.data.allPosts.edges.forEach(({ node }) => {
// //                 //         // console.log("         posts", node);
// //                 //         createPage({
// //                 //             path: `Gallery/${node.slug}`,
// //                 //             component: path.resolve(`./src/pages/singlegallery.js`),
// //                 //             context: {
// //                 //                 id: node.id
// //                 //             },
// //                 //         })
// //                 //         resolve()
// //                 //     })
// //                 // }
// //                 if (result.data.allPages) {
// //                     result.data.allPages.edges.forEach(({ node }) => {
// //                         // console.log("         pages", node);
// //                         createPage({
// //                             path: `Page/${node.slug}`,
// //                             component: path.resolve(`./src/pages/singlePage.js`),
// //                             context: {
// //                                 id: node.id
// //                             },
// //                         })
// //                         resolve()
// //                     })
// //                 }
// //             }
// //             // resolve();


// //         })

// //     }).catch(error => {
// //         console.log(error)
// //         reject()
// //     })
// // };









// // exports.onCreatePage = ({ page }) => {
// //     console.log(page, "Page");
// // }
// // allPosts {
// //     edges {
// //       node {
// //         id
// //       }
// //     }
// //   }
// //   allPages {
// //     edges {
// //       node {
// //         id
// //       }
// //     }
// //   }



// // allPosts {   
// //     edges {
// //       node {
// //         id
// //         slug
// //       }
// //     }
// //   }
// //   allPages {
// //     edges {
// //       node {
// //         id
// //         slug
// //       }
// //     }
// //   }