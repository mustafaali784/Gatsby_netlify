import React from 'react';
import { Link } from 'gatsby'
export default class Posts extends React.Component {
    renderPosts = () => {
        return this.
            props.data.map((el, i) => {
                return (
                    <Link to={`singlePost/${el.node.id}`}> <li className = 'site-link' key = {i}>{el.node.title}</li></Link>
                )
            })
    }   

    render() {
        return (
            <div >
                <Link to="/" >Home</Link>
                <center>
                    <h1>All Posts</h1>
                    <br />
                    <br />
                    <ul>
                        {this.renderPosts()}
                    </ul>
                </center>
            </div>
        )
    }
}