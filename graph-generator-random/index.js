const RanGraph = require('./modules/RandomMultimodalGraph');

let g = new RanGraph({nodes: 20, generationLength: 4});
g.writeToFile("./g.json");