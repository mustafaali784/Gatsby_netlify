import React from "react";
import renderHTML from 'react-render-html';
import { Link } from 'gatsby';

export default class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
  
    renderContent() {
       
        return (
            <div>
                <div><Link to="/posts" >Back To Posts</Link></div>
                <Link to="/" >Home</Link>
                <center>
                    <h3>
                        Title : {this.props.data.title}
                        mustafa
                    </h3>
                </center>
                <br />
                <h3>
                    Content :-
                </h3>
                <br />
                <div>
                    {renderHTML(this.props.data.content)}
                </div>
                <img className="img-responsive" style={{ height: '400px', width: "400px" }} src={this.props.data.image} />
            </div>

        )
    }

    render() {
        return (
            <div>{this.renderContent()}</div>
        )
    }
}
