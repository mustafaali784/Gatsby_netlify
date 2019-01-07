import React from "react";
import renderHTML from 'react-render-html';
import {Link} from 'gatsby';

export default class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : ''
        }
    }
    componentDidMount() {
        const urlParam = new URLSearchParams(window.location.search);
        const id = urlParam.get('id')
        this.setState({
            id
        })
    }
    renderContent() {
        if(this.state.id === ''){
            return null;
        }
        let singleData;
        this.props.data.map(el => {
            if (el.node.id == this.state.id) {
                singleData = el.node;
            }
        })
        const Posts= singleData;
        return (
            <div>
                <div><Link to = "/posts" >Back To Posts</Link></div>
                <Link to="/" >Home</Link>
               <center>
                   <h3>
                    Title : {Posts.title}
                </h3>
                   </center> 
                <br/>
                <h3>
                    Content :-
                </h3>
                <br/>
                <div>
                    {renderHTML(Posts.content)}
                </div>
                <img className="img-responsive" style = {{height : '400px' , width : "400px"}} src = {Posts.image} />
            </div>

        )
    }
    
    render() {
        return (
            <div>{this.renderContent()}</div>
        )
    }
}
