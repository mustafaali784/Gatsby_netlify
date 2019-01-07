import React from 'react';
import { Link } from 'gatsby'
export default class Home extends React.Component {
    renderGallery = () => {
        return this.
            props.data.map((el, i) => {
                console.log(el, "mustafa")
                return (
                    <Link to={`singlegallery?id=${el.node.id}`}> <li className = 'site-link' key = {i}>{el.node.title}</li></Link>
                )
            })
    }

    render() {
        return (
            <div >
                <Link to="/" >Home</Link>
                <center>
                    <h1>Gallery</h1>
                    <br />
                    <br />
                    <ul>
                        {this.renderGallery()}
                    </ul>
                </center>
            </div>
        )
    }
}