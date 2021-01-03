import React, {Component} from 'react';
import { Graph }  from 'react-d3-graph';
import data from './data.json';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import './style.css';
class MulGraph extends Component {


    constructor(props) {

        super(props);

        // setting the state
        this.state = {
            data: data,
            source: 14/*14*/,
            target: 20,//rg.length-1/*20*/,
            time: '08:00',
            m: 30,
            iterations: 20
        }
    
        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleChange(event) {
        console.log("input change detected");

        let value = event.target.value;
        let name = event.target.name;
    
        this.setState({
          [name]: value
        });
      }

      handleClick(event) {
          let reqUrl = `http://localhost:5000/itinerary/${this.state.source}/${this.state.target}/${this.state.time}/${this.state.m}/${this.state.iterations}`;

          console.log(reqUrl);
          fetch(reqUrl);
          
      }

    
    
    
    render() {
        

        const data2 = {
            nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
            links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
        };
        // const data = {
        //     nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
        //     links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
        // };

        
        const myConfig = {
            nodeHighlightBehavior: true,
            node: {
                color: 'lightgreen',
                size: 120,
                highlightStrokeColor: 'blue'
            },
            link: {
                highlightColor: 'lightblue'
            }
        };

        

        
        return (
            <div className="container">
                <div className="row">
                    <div className="col s3">
                    <div className="section">
                        <h5>ACO parameters</h5>
                        <div class="divider"></div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <div className="input-field">
                        <input value={this.state.source} name="source" type="text" className="validate" onChange={this.handleChange}/>
                        <label className="active" for="source">Source node</label>
                        </div>

                        <div className="input-field">
                        <input value={this.state.target} name="target" type="text" className="validate" onChange={this.handleChange}/>
                        <label className="active" for="target">Target node</label>
                        </div>

                        <div className="input-field">
                        <input value={this.state.m} name="m" type="text" className="validate" onChange={this.handleChange}/>
                        <label className="active" for="m">Number of ants</label>
                        </div>

                        <div className="input-field">
                        <input value={this.state.iterations} name="iterations" type="text" className="validate" onChange={this.handleChange}/>
                        <label className="active" for="iterations">Number of iterations</label>
                        </div>

                        <input className="waves-effect waves-light btn fullWidth" type="submit" value="Run ACO" onClick={this.handleClick}/>
                        
                    </div>
                    </div>
                    <div className="col s9 container">
                    <div className="section">
                        <h5>Graph visualization</h5>
                        <div class="divider"></div>
                        <Graph id="mulGraph" data={this.state.data.graph} config={myConfig} />
                    </div>
                    <div className="section">
                         <h5>Itinerary</h5>
                         <div className="divider"></div>
                            <ul class="collection with-header">
                                <li class="collection-header"><h6>Going from {this.state.data.solution.source} to {this.state.data.solution.target} takes {parseInt(this.state.data.solution.duration)} min for {this.state.data.solution.distance.toFixed(1)} Km</h6></li>
                                {
                                    this.state.data.solution.itinerary.map(e => {
                                        return (
                                            <li class="collection-item">Go from {e.current} to {e.next} using {e.vehicle} at {e.time}</li>
                                        );
                                    })
                                }
                                
                                
                            </ul>
                    </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default MulGraph;