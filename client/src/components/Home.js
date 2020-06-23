import React, { Component } from 'react';
import '../../node_modules/materialize-css/dist/css/materialize.min.css'

class Home extends Component {

    constructor(props) {

        super(props);
    }

    render() {
        return(
            <div className="row">
                <div className="col s3 grey lighten-2">
                    <h2>ACO Parameters</h2>
                    <div className="divider"></div>
                    <h2>Itinerary Options</h2>
                </div>
                <div className="col s9 teal lighten-2">
                    <h2>World !!</h2>
                </div>
            </div>
        );
    }
}


export default Home;