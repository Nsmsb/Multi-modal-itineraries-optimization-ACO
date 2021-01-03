import React, {Component} from 'react';
 

class Hello extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log('heelo');
    }
    render() {
        return (
            
            <h2>Hello</h2>

        );
    }
}


export default Hello;