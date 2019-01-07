/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require('axios');
const crypto = require('crypto');
const _ = require('lodash');

// exports.sourceNodes = async ({ boundActionCreators }) => {
exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators;
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
            res.data.map((el, i) => {
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