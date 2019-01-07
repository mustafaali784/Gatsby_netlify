import React from "react";
import renderHTML from 'react-render-html';
import {Link} from 'gatsby';

export default class SinglePage extends React.Component {
    
    renderContent() {
        
        return (
            <div>
                <div><Link to = "/pages" >Back To pages</Link></div>
                <Link to="/" >Home</Link>
               <center>
                   <h3>
                    Title : {this.props.data.title}
                </h3>
                   </center> 
                <br/>
                <h3>
                    Content :-
                </h3>
                <br/>
                <div>
                    {renderHTML(this.props.data.content)}
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
