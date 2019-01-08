import React from "react";
import renderHTML from 'react-render-html';


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
               
                <center>
                    <h3>
                        Title : {this.props.data.title}
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
