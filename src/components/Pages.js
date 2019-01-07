import React from 'react';
import { Link } from 'gatsby'
export default class Pages extends React.Component {
    renderPages = () => {
        return this.props.data.map((el, i) => {
                return (
                    <Link to={`singlePage/${el.node.id}`}> <li className = 'site-link' key = {i}>{el.node.title}</li></Link>
                )
            })
    }
    
    render() {
        return (
            <div >
                <Link to="/" >Home</Link>
                <center>
                    <h1>All Pages</h1>
                    <br />
                    <br />
                    <ul>
                        {this.renderPages()}
                    </ul>
                </center>
            </div>
        )
    }
}