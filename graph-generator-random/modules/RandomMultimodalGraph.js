/******** requiring modules *********/

const Node = require('./Node');
const fs = require('fs');

module.exports = class RandomMultimodalGraph {


    constructor({nodes, generationLength}) {

        this.length = nodes;
        this.nodes = [];
        this.generationLength = generationLength;
        this.transportModes = ["bus", "metro", "tramway"];

        for(let i = 0; i < nodes; i++) {
            this.addNode();
        }

    }

    addNode() {
        let n = new Node(this.nodes.length);
        n.addAdjacentsRandomly(this.length, this.generationLength);
        this.nodes.push(n);

    }


    writeToFile(path) {
        
        fs.writeFile(path, JSON.stringify(this), (err) => {
            if(err) throw err;
            
            console.log("file created !!");
        });
    }




}