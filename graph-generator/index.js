
const fs = require('fs');
//const Mode = require('./classes/TransportMode');
const Graph = require('../project/modules/Graph');

const NODES = 50;

let graph = new Graph({id: 1, directed: false});

for (let i = 0; i < NODES; i++) {
    let j =0;
    for (; j < 5; j++) {
        graph.addNode({
            name: `s${i+j}`,
            type: "p",
        })

        for (let k = 0; k < Math.floor(Math.random() * 6 + 1); k++)
            graph.addEdge({
                source: i+j,
                destination: Math.floor(Math.random() * 6) + 1,
                distance: Math.random() * 10 + 1
            })
    }
}

fs.writeFile("./graph.json", JSON.stringify(graph), (err) => {
    if(err)
        throw err;
    
    console.log("graph generated successfully");
})

