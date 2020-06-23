const MmGraph = require('../graph-generator/modules/MultimodalGraph');
const transportMode = require('../graph-generator/modules/TransportMode');
const Aco = require('./Modules/Aco');
const Ant = require('./Modules/ArtificialAnt');

const RandomGraph = require('../graph-generator-random/modules/RandomMultimodalGraph');
// requiring data

const graphObject = require('./lyon.json');
const graph = require('./data/tclLyon.json');
const transportModes = require('./data/tclLyonPaths.json');
const randomGraph = require('./g.json');

// creating transport modes
// let tms = [];
// transportModes.forEach(t => {
//     tms.push(new transportMode(t));
// });

// creating a multiModal graph
// let mg = new MmGraph({graph: graph, transportModes: tms});
// let MulModGraph = mg.getJsonObject();
// mg.writeToFile("./lyon.json");

// console.log(MulModGraph);
// creating ACO

/*************** random graphs tests **************/
let rg = new RandomGraph({nodes: 20, generationLength: 4});

let acoParams = {
    graph: graph, //randomGraph/*graphObject*/,
    source: 14/*14*/,
    target: 20,//rg.length-1/*20*/,
    time: '08:00',
    m: 30,
    iterations: 20,
    alpha: 0.6,
    beta: 0.4,
    delta: 0.2,
    df: 0.6,
    tf: 0.4,
    r: 0.3
};

let aco = new Aco(acoParams);

let i = 20;

let td = 9999999, tt = 9999999, td2 = -9999999, tt2 = -9999999, data;


var hrstart = process.hrtime();


while(i--) {


    // console.log(`new iteration ============== ${10-i}`);
    aco.newTour();

    aco.ants.forEach((ant, i) => {
        // console.log(`ant ${i}: ===> current id: ${ant.current.id}`);
        while(ant.current.id !== aco.target) {
    
            let {feasibleDeparts, probabilities} = aco.calculateProbabilities(ant);
            aco.choseNextNode(ant, feasibleDeparts, probabilities);
    
            // *********** testing code
    
            
            // *********** testing code
    
        }

        if(!aco.bestAnt || (aco.bestAnt.tourDuration > ant.tourDuration))
            aco.bestAnt = ant;
    
        // console.log(`ant ${i}: ===> current id: ${ant.current.id}, path: ${Array.from(ant.visitedNodes)}\n\n`);
    
        if(tt > ant.tourDuration) {
            tt = ant.tourDuration;
            td = ant.tourDistance;
        this.visitedEdges = new Set();
        data = Array.from(ant.visitedEdges);
        }

        if(tt2 < ant.tourDuration) {
            tt2 = ant.tourDuration;
            td2 = ant.tourDistance;
        }
        
        // if(td > ant.tourDistance)
            // td = ant.tourDistance;
    });
    
    aco.ants.forEach(ant => {
        aco.updatePheromone(ant);
    }); 
    aco.evaporatePheromone();


    // console.log(`best Ant path: ${Array.from(aco.bestAnt.visitedNodes)} ${aco.bestAnt.tourDistance} ${aco.bestAnt.tourDuration} ; ${tt} ${td}\n\n`);

    //console.log(Array.from(aco.bestAnt.visitedEdges), aco.bestAnt.tourDuration, aco.bestAnt.tourDistance, tt, td);
}
var hrend = process.hrtime(hrstart);

// console.log(acoParams, i);
console.log(`best Ant ;;; bestTime ${tt} bestDistance ${td}  ;;; badTime ${tt2}, ${td2}\n\n`);

console.log(data);

console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);