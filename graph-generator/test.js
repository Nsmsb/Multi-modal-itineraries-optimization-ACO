const Mgraph = require('./modules/MultimodalGraph');
const g = require('../project/data/graph1.json');
const miniGraph = require('./data/miniGraph.json');
const Node = require('./modules/Node');
const TransportMode =  require('./modules/TransportMode');
const Adjacent = require('./modules/Adjacent');





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

console.log(calculateTime(12, 24, '11:32'));


// return;
// creating transport modes

// 0 => 6 => 18 => 9
// 13 => 14 => 6 => 10
// 5 => 8 => 11 => 15

t1 = new TransportMode({id: 1, type: "bus", line: [0, 1, 2, 3, 4, 5], departs: ["10:10"]});
t2 = new TransportMode({id: 'alk', type: "walk", line: [0, 1, 2, 3, 4, 5], departs: ["10:10", "10:15", "10:30"]});
// t3 = new TransportMode({id: 3, type: "tramway", line: [13, 14, 6, 10], departs: ["10:10", "10:15", "10:30"]});
// t4 = new TransportMode({id: 4, type: "metro", line: [5, 8, 11, 15], departs: ["10:10", "10:15", "10:30"]});
// t5 = new TransportMode({id: 24, type: "bus", line: [0, 6, 18, 9], departs: ["10:10", "10:15", "10:30"]});

// creating multimodal graph

let mg = new Mgraph({graph: miniGraph, transportModes: [t1]});

// testing fields

/*

let data = {};
data.nodes = [];
let id = 0;

mg.nodes.forEach(node => {
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
            departs: departs
        };

        transportModes.forEach(tm => {
            departs[tm] = tp[tm].getDeparts().map(x => {
                return {
                    time: x.getDepartTime(),
                    price: x.getPrice(),
                    vehicle: x.getVehicle()
                };
            });
        });

        // adding an adjacent
        data.nodes[data.nodes.length - 1].adjacents.push(adjacent);

    });
});

console.log(data.nodes[14].adjacents[0].departs.tramway);

/*

mg.nodes.forEach(node => {
    console.log(node);
    node.getAdjacents().forEach(adj => {
        //console.log(adj.getDestination(), adj.getTransportPlanning().getPlanning());
        adj.getTransportPlanning().getPlanningMixed().forEach(p => {
            console.log(p.getDepartTime(), p.getPrice(), p.getVehicle());
        });
    });
});


console.log(data.nodes[1].adjacents[0]);
*/
mg.writeToFile("./g.json");