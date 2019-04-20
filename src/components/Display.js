import React, { Component } from 'react';

//Can be a functional component or a class component, both works but functional component fits this better in this case as there is no contructor or controller logic and it just takes stuff from props and displays it
class Display extends Component {
    
    render() {
        return (
            //Gotta add styling from material-ui
            <div className="result-container">
                {this.props.result&&(
                    <h3>Result: ${this.props.result}</h3>
                )}
            </div>
        );
    }
}

export default Display;