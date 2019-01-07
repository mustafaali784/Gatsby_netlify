import React from "react";
import renderHTML from 'react-render-html';
import {Link} from 'gatsby';

export default class SinglePage extends React.Component {
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
        const pages= singleData;
        return (
            <div>
                <div><Link to = "/pages" >Back To pages</Link></div>
                <Link to="/" >Home</Link>
               <center>
                   <h3>
                    Title : {pages.title}
                </h3>
                   </center> 
                <br/>
                <h3>
                    Content :-
                </h3>
                <br/>
                <div>
                    {renderHTML(pages.content)}
                </div>
            </div>

        )
    }
    
    render() {
        return (
            <div>{this.renderContent()}</div>
        )
    }
}
