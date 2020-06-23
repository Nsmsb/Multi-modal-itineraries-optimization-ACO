const fs = require('fs');
const Node = require('./Node');
const TransportMode = require('./TransportMode');
const TranspotPlanning = require('./TransportPlanning');
const Planning = require('./Planning');
const Depart = require('./Depart');

module.exports = class MultimodalGraph {

    constructor({graph, transportModes}) {

        // initializing properties
        this.nodes = new Array(graph.length);
        this.transportModes = transportModes || [];
        
        for(let i = 0; i < graph.length; i++) {

            // adding a node
            this.nodes[i] = new Node({
                id: i
            });

            // adding its adjacents
            graph[i].adjacencyList.forEach(adjacent => {
                this.nodes[i].addAdjacent(adjacent.destination, new TranspotPlanning({
                    walk: new Planning({distance: Math.random()*10}),
                    bus: new Planning({distance: Math.random()*10}),
                    metro: new Planning({distance: Math.random()*10}),
                    tramway: new Planning({distance: Math.random()*10})
                }));
            });
            
        }

        // filling the plannings

        transportModes.forEach(tm => {
            let path = tm.getLine();

            tm.getDeparts().forEach(dp => {

                let time = dp;
                for(let i = 0; i < path.length-1; i++) {

                    // getting the next station (adjacent)
                    let nextStation = this.nodes[path[i]].getAdjacent(path[i+1]);
                    let distance = nextStation.getTransportPlanning().getPlanning()[tm.getType()].getDistance();
                    let travelingTime = Math.ceil(distance/60*60)+1;
                    // adding the planning (depart time)
                    this.nodes[path[i]].getAdjacent(path[i+1]).addPlanning(time, travelingTime, Math.random()*10, tm);

                    //calculating travel time
                    time =  calculateTime(distance, 60, time);
                    //this.nodes[path[i]].getAdjacent(path[i+1]).addPlanning(time, Math.random()*10, tm);
                }
            });
        });



        // utility functions

        function calculateTime(distance, speed, currentTime) {
            let [hour, minutes] = currentTime.split(':');
            hour = parseInt(hour);
            minutes = parseInt(minutes);
        
            let time = Math.ceil(distance/speed*60)+1;
        
            minutes = minutes+time;
            hour = Math.floor((hour+minutes/60)%24);
            minutes %= 60;
        
            return `${hour}:${minutes}`;
        };

    }

    addTransportMode({path, departs}) {
        this.transportModes.push(new TransportMode({path, departs}));
    }

    getJsonObject() {
        let data = {};
        data.nodes = [];
        let id = 0;

        this.nodes.forEach(node => {
            // adding a node
            data.nodes.push({
                id: id++,
                adjacents: []
            });

            console.log("adjacent ***** \n\n");
            node.getAdjacents().forEach(adj => {

                // storing transport modes/plannings
                let tp = adj.getTransportPlanning().getPlanning();
                let transportModes = Object.keys(tp);
                
                let departs = {};
                let adjacent = {
                    id: adj.getDestination(),
                    transportModes: departs
                };

                transportModes.forEach(tm => {

                    // checking if the object already exists
                    if(!departs[tm])
                        departs[tm] = {};


                    departs[tm].distance = tp[tm].getDistance(); 
                    departs[tm].departs = tp[tm].getDeparts().map(x => {
                        return {
                            time: x.getDepartTime(),
                            duration: x.getDuration(),
                            price: x.getPrice(),
                            vehicle: x.getVehicle()
                        };
                    });
                });

                // adding an adjacent
                data.nodes[data.nodes.length - 1].adjacents.push(adjacent);

            });
        });

        return data;
    }

    writeToFile(path) {
        let data = this.getJsonObject();
        
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if(err) throw err;
            
            console.log("file created !!");
        });
    }
}



