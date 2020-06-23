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

let rg = new RandomGraph({nodes: 20, generationLength: 4});

let acoParams = {
    graph: rg, //randomGraph/*graphObject*/,
    source: 0/*14*/,
    target: 19,//rg.length-1/*20*/,
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


var hrstart = process.hrtime();

aco.run();

var hrend = process.hrtime(hrstart);

aco.getSolution();

// console.log(acoParams, i);
console.log(`best Ant ;;; bestTime ${aco.bestAnt.tourDuration} bestDistance ${aco.bestAnt.tourDistance}  ;;;\n\n`);

console.log(Array.from(aco.bestAnt.visitedEdges), '\n\n\n\n\n');
console.log('****************');
console.log(Array.from(aco.bestAnt.visitedNodes), '\n\n\n\n\n');
console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
console.info(aco.getSolution());