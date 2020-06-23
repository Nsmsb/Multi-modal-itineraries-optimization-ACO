/******** requiring modules *********/

const Adjacent = require('./Adjacent');

module.exports = class {

    constructor(id) {
        this.id = id;
        this.adjacents = [];
    }


    addAdjacent(id) {
        this.adjacents.push(new adjacent(id));
    }

    addAdjacentsRandomly(nodes, generationLength) {
        let adj;
        if(this.id + generationLength-1 >= nodes ) {
            adj = new Adjacent(nodes-1);
            adj.AddRandomDeparts();
            this.adjacents.push(adj);
            return;
        }

        // let nodesArray = new Array(nodes);
        // for(let i = 0; i < nodes; i++)
        //     nodesArray[i] = i+1;

        // nodesArray.s

        let i = Math.round(2+Math.random()*(generationLength-3));
        while(i--) {
            let adjId = this.id + Math.round(1+Math.random()*(generationLength-1));
            adj = new Adjacent(adjId);
            adj.AddRandomDeparts();
            this.adjacents.push(adj);
        }
    }
}